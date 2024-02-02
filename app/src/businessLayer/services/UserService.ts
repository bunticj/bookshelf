import { UserRepository } from "../../dataAccessLayer/repository/UserRepository";
import { RoleType } from "../enum/RoleType";
import { StatusType } from "../enum/StatusType";
import { User } from "../model/User";

class UserService {
    private repository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.repository = userRepository;
    }

    public async getByEmail(email: string): Promise<User | undefined> {
        const userData = await this.repository.getByEmail(email);
        return userData;
    }

    public async getByUserId(userId: number): Promise<User | undefined> {
        const userData = await this.repository.getByUserId(userId);
        return userData;
    }

    public async createUser(email: string, password: string, firstName: string, lastName: string, role?: RoleType, status?: StatusType): Promise<User> {
        const user = await this.repository.createUser(email, password, firstName, lastName, role, status);
        return user;
    }

    public async updateUser(user: Partial<User>): Promise<void> {
        await this.repository.updateUser(user)
    }
}

export const userService = new UserService(new UserRepository());