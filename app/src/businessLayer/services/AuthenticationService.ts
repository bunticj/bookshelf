import { RoleType } from "../enum/RoleType";
import { TokenType } from "../enum/TokenType";
import { ITokenPayload, ITokenResponse } from "../interface/HelperInterface";
import { Constants } from "../utils/Constants";
import { verify, sign } from "jsonwebtoken"
import EnvConfig from "../../businessLayer/utils/EnvConfig";
import { CustomError } from "../model/CustomError";
import { ErrorType } from "../enum/ErrorType";

export class AuthenticationService {
    constructor() {
    }

    public signAuthTokens(userId: number, role: RoleType): ITokenResponse {
        const accessToken = this.signToken(userId, role, TokenType.Access);
        const refreshToken = this.signToken(userId, role, TokenType.Refresh);
        return { accessToken, refreshToken };
    }

    private signToken(userId: number, role: RoleType, tokenType: TokenType): string {
        const expiresIn = tokenType === TokenType.Access ? Constants.accessTokenExpirationInSeconds : Constants.refreshTokenExpirationInSeconds;
        const payload: ITokenPayload = { userId, role, tokenType };
        const token = sign(payload, EnvConfig.JWT_SECRET, { expiresIn });
        return token;
    }

    public verifyJwt = (token: string): ITokenPayload => {
        if (!token) throw new CustomError(ErrorType.Unauthorized, ErrorType[ErrorType.Unauthorized]);
        const jwtPayload: ITokenPayload = (verify(token, EnvConfig.JWT_SECRET)) as any;
        if (!jwtPayload || !jwtPayload.userId || jwtPayload.tokenType !== TokenType.Access) throw new CustomError(ErrorType.Unauthorized, ErrorType[ErrorType.Unauthorized]);
        return jwtPayload;
    }
}
