import express from 'express';
import * as bcrypt from 'bcrypt';
import { CustomError } from "../../businessLayer/model/CustomError";
import { Constants } from "../../businessLayer/utils/Constants";
import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { userAccountService } from '../../businessLayer/services/UserAccountService';
import { RoleType } from '../../businessLayer/enum/RoleType';
import { ErrorHandler } from '../../businessLayer/utils/ErrorHandler';

class UserAccountController {
    private validateUserBody(email: string, password: string) {
        if (!email || typeof email !== 'string' || email.length > 128) throw new CustomError(ErrorType.ValidationError, "Invalid email name", { email });
        if (!password || typeof password !== 'string') throw new CustomError(ErrorType.ValidationError, "Invalid password");
    }

    public async register(req: express.Request, res: express.Response) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const roleType = req.body.roleType === RoleType.Admin && req.path.includes("admin") ? RoleType.Admin : RoleType.Regular;
            this.validateUserBody(email, password);
            const user = await userAccountService.getByEmail(email);
            if (user) throw new CustomError(ErrorType.UserExists, "Email already exists", { email });
            const hashedPass = await bcrypt.hash(password, Constants.bcryptSaltRounds);
            const createdUser = await userAccountService.createUserAccount(email, hashedPass, roleType);
            res.status(200).send(createdUser);
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
            this.validateUserBody(email, password);
            const user = await userAccountService.getByEmail(email);
            if (!user) throw new CustomError(ErrorType.InvalidUser, "User doesn't exist", { email })
            const isMatch = await bcrypt.compare(password, user.password!);
            if (!isMatch) throw new CustomError(ErrorType.InvalidUser, "Wrong password");
            res.status(200).send(user);
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { ...req.body });
            res.status(401).send(error);
        }
    }

    public async getById(req: express.Request, res: express.Response) {
        try {
            const userId = +req.params.userId;
            if (typeof userId !== "number") throw new CustomError(ErrorType.InvalidUser, "Invalid user id");
            const user = await userAccountService.getByUserId(userId);
            if (!user) throw new CustomError(ErrorType.InvalidUser, "User doesn't exist", { userId });
            res.status(200).send(user);
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(400).send(error);
        }
    }


}
export const userAccountController = new UserAccountController();