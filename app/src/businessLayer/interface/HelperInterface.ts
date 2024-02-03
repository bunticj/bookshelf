import { ErrorType } from "../enum/ErrorType";
import { RoleType } from "../enum/RoleType";
import { TokenType } from "../enum/TokenType";

export interface IDictionary<T = any> {
    [index: string | number]: T;
}

export interface IErrorResponse {
    errorType: ErrorType;
    message: string;
}

export interface ITokenPayload {
    userId: number;
    role: RoleType;
    tokenType: TokenType;
}

export interface ITokenResponse {
    accessToken: string;
    refreshToken: string;
}