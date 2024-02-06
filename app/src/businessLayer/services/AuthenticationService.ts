import { RoleType } from "../enum/RoleType";
import { TokenType } from "../enum/TokenType";
import { ITokenPayload, ITokenResponse } from "../interface/HelperInterface";
import { Constants } from "../utils/Constants";
import { verify, sign } from "jsonwebtoken";
import EnvConfig from "../../businessLayer/utils/EnvConfig";
import { CustomError } from "../model/CustomError";
import { ErrorType } from "../enum/ErrorType";

export class AuthenticationService {
    public signAuthTokens(userId: number, role: RoleType): ITokenResponse {
        const accessToken = this.signToken(userId, role, TokenType.Access);
        const refreshToken = this.signToken(userId, role, TokenType.Refresh);
        return { accessToken, refreshToken };
    }

    private signToken(userId: number, role: RoleType, tokenType: TokenType): string {
        const expiresIn = tokenType === TokenType.Access ? Constants.accessTokenExpirationInSeconds : Constants.refreshTokenExpirationInSeconds;
        const iss = `${EnvConfig.SERVER_HOST}:${EnvConfig.SERVER_PORT}`;
        const payload: ITokenPayload = { userId, role, tokenType, iss };
        const token = sign(payload, EnvConfig.JWT_SECRET, { expiresIn });
        return token;
    }

    public verifyJwt = (token: string, tokenType: TokenType): ITokenPayload => {
        if (!token) throw new CustomError(ErrorType.Unauthorized, ErrorType[ErrorType.Unauthorized]);
        const jwtPayload: ITokenPayload = (verify(token, EnvConfig.JWT_SECRET)) as any;
        if (!jwtPayload || !jwtPayload.userId || jwtPayload.tokenType !== tokenType) throw new CustomError(ErrorType.Unauthorized, "Invalid token verification", { tokenType });
        return jwtPayload;
    };
}
