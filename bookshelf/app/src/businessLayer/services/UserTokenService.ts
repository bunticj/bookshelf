import { UserTokenRepository } from "../../dataAccessLayer/repository/UserTokenRepository";
import { ErrorType } from "../enum/ErrorType";
import { RoleType } from "../enum/RoleType";
import { ITokenResponse } from "../interface/HelperInterface";
import { CustomError } from "../model/CustomError";
import { UserToken } from "../model/UserToken";
import { serviceManager } from "./ServiceManager";
export class UserTokenService {
    private repository: UserTokenRepository;
    constructor(tokenRepository: UserTokenRepository) {
        this.repository = tokenRepository;
    }

    public async createUserToken(userId: number, refreshToken: string): Promise<UserToken> {
        await this.repository.deleteTokenByUserId(userId);
        const userToken = await this.repository.create(userId, refreshToken);
        return userToken;
    }

    public async deleteUserToken(userId: number): Promise<void> {
        await this.repository.deleteTokenByUserId(userId);
    }

    /**
     * Handles the refresh token for a user.
     * @param {number} userId - The ID of the user.
     * @param {string} oldRefreshToken - The old refresh token.
     * @param {RoleType} role - The role of the user.
     * @returns {Promise<ITokenResponse>} Returns a promise resolving to an object containing new tokens.
     * @throws {CustomError} Throws an unauthorized error if the provided refresh token is invalid.
     */
    public async handleRefreshToken(userId: number, oldRefreshToken: string, role: RoleType): Promise<ITokenResponse> {
        const userTokenData = await this.repository.getTokenByUserId(userId);
        if (!userTokenData || oldRefreshToken !== userTokenData.refreshToken) throw new CustomError(ErrorType.Unauthorized, "Invalid refresh token", { oldRefreshToken, userTokenData });
        const tokens = serviceManager.authenticationService.signAuthTokens(userId, role);
        await this.createUserToken(userId, tokens.refreshToken);
        return tokens;
    }

    public async clearOldTokens() {
        await this.repository.deleteExpiredTokens();
    }

}