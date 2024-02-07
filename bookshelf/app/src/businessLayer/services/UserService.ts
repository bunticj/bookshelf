import { UserRepository } from "../../dataAccessLayer/repository/UserRepository";
import { RoleType } from "../enum/RoleType";
import { StatusType } from "../enum/StatusType";
import { IPaginatedData } from "../interface/HelperInterface";
import { User } from "../model/User";
import EnvConfig from "../utils/EnvConfig";
import { LOGGER } from "../utils/Logger";
export class UserService {
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

    public async getUsers(page: number, size: number): Promise<IPaginatedData<User>> {
        const userData = await this.repository.getUsers(page, size);
        return userData;
    }

    public async createUser(email: string, password: string, firstName: string, lastName: string, role?: RoleType, status?: StatusType): Promise<User> {
        const user = await this.repository.create(email, password, firstName, lastName, role, status);
        return user;
    }

    public async updateUser(user: Partial<User>): Promise<void> {
        await this.repository.updateUser(user);
    }

    public async deleteUser(userId: number): Promise<void> {
        await this.repository.deleteUser(userId);
    }

    public async changePassword(userId: number, pass: string): Promise<void> {
        await this.repository.changePassword(userId, pass);
    }

    public async initAdmin(): Promise<void> {
        const adminId = await this.repository.getAdminId();
        if (!adminId) {
            try {
                await this.createUser(EnvConfig.DEFAULT_ADMIN_EMAIL, EnvConfig.DEFAULT_ADMIN_PASS, "name", "lastName", RoleType.Admin, StatusType.Active);
            } catch (error) {
                LOGGER.critical(`There is no admin in the database and default admin email is occupied by the regular user: ${EnvConfig.DEFAULT_ADMIN_EMAIL}. 
                Update default admin email in .env file!`);
                process.exit();
            }
        }
    }
}