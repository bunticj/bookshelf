import express from 'express';
import * as bcrypt from 'bcrypt';
import { CustomError } from "../../businessLayer/model/CustomError";
import { Constants } from "../../businessLayer/utils/Constants";
import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { RoleType } from '../../businessLayer/enum/RoleType';
import { ErrorHandler } from '../../businessLayer/utils/ErrorHandler';
import { User } from '../../businessLayer/model/User';
import { serviceManager } from '../../businessLayer/services/ServiceManager';
import { validator } from '../validator/Validator';
import { StatusType } from '../../businessLayer/enum/StatusType';
import { ITokenPayload } from '../../businessLayer/interface/HelperInterface';

class UserController {
    public async register(req: express.Request, res: express.Response) {
        try {
            const userBody = req.body as User;
            validator.validateUserStrings(userBody, false);
            const { email, password, firstName, lastName } = req.body as User;
            const existingUser = await serviceManager.userService.getByEmail(email);
            if (existingUser) throw new CustomError(ErrorType.UserAlreadyExists, "Email already exists", { email });
            const hashedPass = await bcrypt.hash(password!, Constants.bcryptSaltRounds);

            const user = await serviceManager.userService.createUser(email, hashedPass, firstName, lastName, RoleType.Author);
            const tokens = serviceManager.authenticationService.signAuthTokens(user.id!, RoleType.Author);
            await serviceManager.userTokenService.createUserToken(user.id!, tokens.refreshToken);
            delete user.password;
            res.status(200).send({ data: { user, tokens } });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { ...req.body });
            res.status(error.status).send({ error: error.data });
        }
    }

    public async login(req: express.Request, res: express.Response) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            validator.validateUserStrings(req.body, true);
            const user = await serviceManager.userService.getByEmail(email);
            if (!user) throw new CustomError(ErrorType.NonexistentUser, "User doesn't exist", { email });
            const isMatch = await bcrypt.compare(password, user.password!);
            if (!isMatch) throw new CustomError(ErrorType.Unauthorized, "Unauthorized");
            if (user.status === StatusType.Inactive) {
                await serviceManager.userService.updateUser({ id: user.id, status: StatusType.Active });
                await serviceManager.bookService.updateBookStatusByAuthorId(user.id!, StatusType.Active);
            }
            const tokens = serviceManager.authenticationService.signAuthTokens(user.id!, user.role);
            await serviceManager.userTokenService.createUserToken(user.id!, tokens.refreshToken);
            delete user.password;
            res.status(200).send({ data: { user, tokens } });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { ...req.body });
            res.status(error.status).send({ error: error.data });
        }
    }

    public async getById(req: express.Request, res: express.Response) {
        try {
            const wantedUserId = +req.params.userId;
            if (isNaN(wantedUserId)) throw new CustomError(ErrorType.BadRequest, "Invalid user id");
            const { role, userId } = res.locals.jwtPayload as ITokenPayload;
            if (role !== RoleType.Admin && wantedUserId !== userId) throw new CustomError(ErrorType.Forbidden, "Can't get unowned user", { wantedUserId, userId });
            const user = await serviceManager.userService.getByUserId(userId);
            if (!user) throw new CustomError(ErrorType.NonexistentUser, "User doesn't exist", { userId });
            res.status(200).send({ data: user });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }
    }

    public async getUsers(req: express.Request, res: express.Response) {
        try {
            const { page, totalPages } = validator.validatePaginationQuery(req.query.page, req.query.size);
            const users = await serviceManager.userService.getUsers(page, totalPages);
            res.status(200).send({ data: users });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }
    }
}

export const userController = new UserController();