import { ErrorType } from "../enum/ErrorType";
import { IDictionary, IErrorResponseData } from "../interface/HelperInterface";
import { CustomError } from "../model/CustomError";
import { ErrorResponse } from "../model/ErrorResponse";

import { LOGGER } from "./Logger";

export class ErrorHandler {
    /**
     * Handles errors by creating an ErrorResponse object.
     * If the error is not a CustomError, it constructs a CustomError object with the type ErrorType.UnknownError.
     * Logs critical errors and verbose information about thrown errors.
     * @param {Error} error - The error object.
     * @param {IDictionary<any>} additionalData - Additional data to include in the error response. Default is an empty object.
     * @returns {ErrorResponse} The ErrorResponse object representing the error.
     */
    public static catchError(error: Error, additionalData: IDictionary<any> = {}): ErrorResponse {
        let customError = error as CustomError;
        if (additionalData.password) additionalData.password = "*";
        if (!customError.errorType) {
            customError = new CustomError(ErrorType.UnknownError, error.message, { stack: error.stack, name: error.name });
            LOGGER.critical(`unthrownError: ${JSON.stringify(customError)} \n additionalData = ${JSON.stringify(additionalData)}`);
        }
        else LOGGER.verbose(`thrownError: ${JSON.stringify(customError)} \n additionalData = ${JSON.stringify(additionalData)}`);
        const data: IErrorResponseData = { errorType: customError.errorType, message: error.message };
        const status = this.handleErrorStatus(data.errorType);
        return new ErrorResponse(data, status);
    }

    private static handleErrorStatus(errorType: ErrorType): number {
        switch (errorType) {
            case ErrorType.Unauthorized: return 401;
            case ErrorType.Forbidden: return 403;
            case ErrorType.NotFound: return 404;
            case ErrorType.QueryError:
            case ErrorType.UnknownError: return 500;
            default: return 400;

        }
    }
}
