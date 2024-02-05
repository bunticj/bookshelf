import { ErrorType } from "../enum/ErrorType";
import { RoleType } from "../enum/RoleType";
import { TokenType } from "../enum/TokenType";

export interface IDictionary<T = any> {
    [index: string | number]: T;
}

export interface IErrorResponseData {
    errorType: ErrorType;
    message: string;
}

export interface ITokenPayload {
    userId: number;
    role: RoleType;
    tokenType: TokenType;
    iss: string;
}

export interface ITokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IPaginatedData<T> {
    page: number;
    totalPages: number;
    data: T[];
}