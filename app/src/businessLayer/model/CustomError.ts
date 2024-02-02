import { ErrorType } from "../enum/ErrorType";
import { IDictionary } from "../interface/HelperInterface";
export class CustomError extends Error {
    public errorType: ErrorType;
    public additionalData?: any;
    constructor(errorType: ErrorType, message: string = "", additionalData: IDictionary = {}) {
        super();
        this.message = message;
        this.errorType = errorType;
        this.additionalData = additionalData;
    }
}