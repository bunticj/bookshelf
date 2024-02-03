import { ErrorType } from "../enum/ErrorType";
import { IDictionary, IErrorResponse } from "../interface/HelperInterface";
import { CustomError } from "../model/CustomError";
import { LOGGER } from "./Logger";

export class ErrorHandler {
    public static catchError(error: Error, additionalData: IDictionary<any> = {}): IErrorResponse {
        let customError = error as CustomError;
        if (additionalData.password) additionalData.password = "*";
        if (!customError.errorType) {
            customError = new CustomError(ErrorType.UnknownError, error.message, { stack: error.stack, name: error.name });
            LOGGER.critical(`unthrownError: ${JSON.stringify(customError)} \n additionalData = ${JSON.stringify(additionalData)}`);
        }
        else LOGGER.verbose(`thrownError: ${JSON.stringify(customError)} \n additionalData = ${JSON.stringify(additionalData)}`);
        const errorResponse: IErrorResponse = { errorType: customError.errorType, message: error.message };
        return errorResponse;
    }
}
