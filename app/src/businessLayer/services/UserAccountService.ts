import { CustomError } from "../model/CustomError";
import { UserAccountRepository } from "../../dataAccessLayer/repository/UserRepository";
import { UserAccount } from "../model/UserAccount";
import { RoleType } from "../enum/RoleType";
import { StatusType } from "../enum/StatusType";

class UserService {
    private repository: UserAccountRepository;
    constructor() {
        this.repository = new UserAccountRepository();
    }

    public async getByEmail(email: string): Promise<UserAccount | undefined> {
        const userData = await this.repository.getByEmail(email);
        // TODO hide password
        return userData;
    }

    public async getByUserId(userId: number): Promise<UserAccount | undefined> {
        const userData = await this.repository.getByUserId(userId);
        // TODO hide password
        return userData;
    }

    public async createUserAccount(email: string, password: string, role?: RoleType, status?: StatusType): Promise<void> {
        const user = new UserAccount(email, password, role, status);
        const result = await this.repository.create(user);
        if (result.error) throw result.error as CustomError;
        // TODO return id
        return;
    }
}

export const userService = new UserService();