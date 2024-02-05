import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { IErrorResponseData } from "../../businessLayer/interface/HelperInterface";
import { CustomError } from "../../businessLayer/model/CustomError";
import { ErrorHandler } from "../../businessLayer/utils/ErrorHandler";
import express from "express";

// handle express errors
export const errorInterceptor = (error: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    try {
        if (error instanceof Error) {
            (error as CustomError)["errorType"] = ErrorType.BadRequest;
            const errorResponse = ErrorHandler.catchError(error, { url: req.originalUrl, method: req.method, ...req.body });
            res.status(400).send(errorResponse);
        }
        else next();
    } catch (err) {
        const errorResponse = ErrorHandler.catchError(err as Error, { url: req.originalUrl, method: req.method, ...req.body });
        res.status(400).send(errorResponse);
    }
}

export const notFound = (req: express.Request, res: express.Response): void => {
    const errorResponse: IErrorResponseData = { errorType: ErrorType.NotFound, message: "Resource not found" };
    res.status(404).send(errorResponse);
}



