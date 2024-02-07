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