import { ErrorType } from "../enum/ErrorType";

export interface IDictionary<T> {
    [index: string | number]: T;
}

export interface IErrorResponse {
    errorType: ErrorType;
    message: string;
}