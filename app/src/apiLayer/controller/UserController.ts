import express from 'express';
import * as bcrypt from 'bcrypt';
import { CustomError } from "../../businessLayer/model/CustomError";
import { Constants } from "../../businessLayer/utils/Constants";
import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { RoleType } from '../../businessLayer/enum/RoleType';
import { ErrorHandler } from '../../businessLayer/utils/ErrorHandler';
import { validateStringLengths, validateStrings } from '../validator/Validator';
import { User } from '../../businessLayer/model/User';
import { StatusType } from '../../businessLayer/enum/StatusType';
import { serviceManager } from '../../businessLayer/services/ServiceManager';
import { IDictionary } from '../../businessLayer/interface/HelperInterface';

class UserController {
    private static validateRegisterBody(body: IDictionary) {
        const stringsToValidate = ["firstName", "lastName", "password", "email"];
        validateStrings(stringsToValidate, body);
        validateStringLengths(stringsToValidate, [32, 32, 64, 128])
    }

    public async register(req: express.Request, res: express.Response) {
        try {
            UserController.validateRegisterBody(req.body);
            const { email, password, firstName, lastName } = req.body as User;
            const role = RoleType.Author;
            const status = StatusType.Active;
            const existingUser = await serviceManager.userService.getByEmail(email);
            if (existingUser) throw new CustomError(ErrorType.UserAlreadyExists, "Email already exists", { email });
            const hashedPass = await bcrypt.hash(password!, Constants.bcryptSaltRounds);
            const user = await serviceManager.userService.createUser(email, hashedPass, firstName, lastName, role, status);
            const tokens = serviceManager.authenticationService.signAuthTokens(user.id!, role);
            delete user.password;
            res.status(200).send({ user, tokens });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { ...req.body });
            res.status(401).send(error);
        }
    }

    public async login(req: express.Request, res: express.Response) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await serviceManager.userService.getByEmail(email);
            if (!user) throw new CustomError(ErrorType.NonexistentUser, "User doesn't exist", { email })
            const isMatch = await bcrypt.compare(password, user.password!);
            if (!isMatch) throw new CustomError(ErrorType.Unauthorized, "Unauthorized");
            const tokens = serviceManager.authenticationService.signAuthTokens(user.id!, user.role);
            delete user.password;
            res.status(200).send({ user, tokens });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { ...req.body });
            res.status(401).send(error);
        }
    }

    public async getById(req: express.Request, res: express.Response) {
        try {
            const userId = +req.params.userId;
            if (typeof userId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid user id");
            const user = await serviceManager.userService.getByUserId(userId);
            if (!user) throw new CustomError(ErrorType.NonexistentUser, "User doesn't exist", { userId });
            res.status(200).send(user);
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(400).send(error);
        }
    }

    public async deactivate(req: express.Request, res: express.Response) {
        try {
            const userId = res.locals.jwtPayload.userId;
            const wantedPlayerId = +req.params.userId;
            if (typeof wantedPlayerId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid user id");
            if (wantedPlayerId !== userId) throw new CustomError(ErrorType.Forbidden, "Forbidden");
            await serviceManager.userService.updateUser({ id: userId, status: StatusType.Inactive });
            await serviceManager.bookService.updateBook({ authorId: userId, status: StatusType.Inactive });
            res.status(200).send({ message: "User deactivated" });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(400).send(error);
        }
    }
}
export const userController = new UserController();