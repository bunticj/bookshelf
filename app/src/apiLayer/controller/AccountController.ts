import express from 'express';
import { CustomError } from "../../businessLayer/model/CustomError";
import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { ErrorHandler } from '../../businessLayer/utils/ErrorHandler';
import { StatusType } from '../../businessLayer/enum/StatusType';
import { serviceManager } from '../../businessLayer/services/ServiceManager';
import { RoleType } from '../../businessLayer/enum/RoleType';
import { TokenType } from '../../businessLayer/enum/TokenType';
import { validator } from '../validator/Validator';
import { Constants } from '../../businessLayer/utils/Constants';
import * as bcrypt from 'bcrypt';

class AccountController {

    public async deactivate(req: express.Request, res: express.Response) {
        try {
            const userId = res.locals.jwtPayload.userId;
            const wantedPlayerId = +req.params.userId;
            if (typeof wantedPlayerId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid user id");
            if (wantedPlayerId !== userId) throw new CustomError(ErrorType.Forbidden, "Forbidden");
            await serviceManager.userService.updateUser({ id: userId, status: StatusType.Inactive });
            await serviceManager.bookService.updateBookStatusByAuthorId(userId, StatusType.Inactive);
            await serviceManager.userTokenService.deleteUserToken(userId);
            res.status(200).send({ data: "OK" });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }
    }

    public async deleteUser(req: express.Request, res: express.Response) {
        try {
            const userId = +req.params.userId;
            if (typeof userId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid user id");
            const user = await serviceManager.userService.getByUserId(userId);
            if (!user) throw new CustomError(ErrorType.NotFound, "Invalid user id");
            if (user?.role === RoleType.Admin && user.status === StatusType.Active) throw new CustomError(ErrorType.Forbidden, "Only admin can delete user");
            await serviceManager.userService.deleteUser(userId);
            res.status(200).send({ data: "OK" });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }
    }

    public async updateUser(req: express.Request, res: express.Response) {
        try {
            const userId = +req.params.userId;
            if (typeof userId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid user id", { userId });
            validator.validateUserStrings(req.body, false);
            validator.validateEnums(req.body.role as RoleType, Object.values(RoleType));
            validator.validateEnums(req.body.status as StatusType, Object.values(StatusType));
            await serviceManager.userService.updateUser(req.body);
            res.status(200).send({ data: "OK" });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }
    }

    public async changePassword(req: express.Request, res: express.Response) {
        try {
            const userId = +req.params.userId;
            if (typeof userId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid user id", { userId });
            if (userId !== res.locals.jwtPayload.userId) throw new CustomError(ErrorType.Forbidden, "Can't change pass for other players", { userId, tokenOwnerId: res.locals.jwtPayload.userId });
            validator.validateUserStrings({ password: req.body.password }, true);
            const hashedPass = await bcrypt.hash(req.body.password!, Constants.bcryptSaltRounds);
            await serviceManager.userService.changePassword(userId, hashedPass);
            res.status(200).send({ data: "OK" });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }
    }

    public async refreshToken(req: express.Request, res: express.Response) {
        try {
            const bodyToken = req.body.refreshToken;
            const { userId, role } = serviceManager.authenticationService.verifyJwt(bodyToken, TokenType.Refresh);
            const tokens = await serviceManager.userTokenService.handleRefreshToken(userId, bodyToken, role);
            res.status(200).send({ data: tokens });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }

    }
}
export const accountController = new AccountController();