import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../businessLayer/model/CustomError";
import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { RoleType } from "../../businessLayer/enum/RoleType";
import { ErrorHandler } from "../../businessLayer/utils/ErrorHandler";
import { serviceManager } from "../../businessLayer/services/ServiceManager";
import { TokenType } from "../../businessLayer/enum/TokenType";

export const isAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const unprotectedRoutes = ['/login', '/register'];
        if (unprotectedRoutes.includes(req.path)) return next();
        const jwtPayload = serviceManager.authenticationService.verifyJwt(req.headers.authorization!, TokenType.Access);
        res.locals.jwtPayload = jwtPayload;
        return next();
    } catch (error) {
        const errorResponse = ErrorHandler.catchError(error as Error, { url: req.originalUrl, method: req.method, ...req.body });
        res.status(400).send(errorResponse);
    }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const unprotectedRoutes = ['/login'];
        if (unprotectedRoutes.includes(req.path)) return next();
        const jwtPayload = serviceManager.authenticationService.verifyJwt(req.headers.authorization!, TokenType.Access)
        if (jwtPayload.role !== RoleType.Admin) throw new CustomError(ErrorType.Forbidden, "Forbidden")
        res.locals.jwtPayload = jwtPayload;
        res.locals.isAdmin = true;
        return next();
    } catch (error) {
        const errorResponse = ErrorHandler.catchError(error as Error, { url: req.originalUrl, method: req.method, ...req.body });
        res.status(400).send(errorResponse);
    }
};

