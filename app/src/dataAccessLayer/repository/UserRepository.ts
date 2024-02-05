import { RoleType } from "../../businessLayer/enum/RoleType";
import { StatusType } from "../../businessLayer/enum/StatusType";
import { IPaginatedData } from "../../businessLayer/interface/HelperInterface";
import { User } from "../../businessLayer/model/User";
import { Constants } from "../../businessLayer/utils/Constants";
import { UserQuery } from "../database/query/UserQuery";
export class UserRepository {
    private query: UserQuery;
    constructor() {
        this.query = new UserQuery();
    }

    public async create(email: string, password: string, firstName: string, lastName: string, role?: RoleType, status?: StatusType): Promise<User> {
        let user = new User(email, firstName, lastName, password, role, status);
        user = await this.query.createEntity(user);
        return user;
    }

    public async getByUserId(id: number): Promise<User | undefined> {
        const user = await this.query.getEntity("id", id);
        if (!user) return;
        return user;
    }

    public async getUsers(page: number, size: number): Promise<IPaginatedData<User>> {
        const users = await this.query.getAllData(page, size);
        return users;
    }

    public async getByEmail(email: string): Promise<User | undefined> {
        const user = await this.query.getEntity("email", email);
        if (!user) return;
        return user;
    }

    public async getAdminId(): Promise<number | undefined> {
        const adminId = await this.query.getSingleColumn<number, number>(Constants.idName, Constants.roleName, RoleType.Admin);
        return adminId;
    }

    public async updateUser(data: Partial<User>): Promise<void> {
        await this.query.updateEntityById(data);
    }
    public async changePassword(userId: number, pass: string): Promise<void> {
        await this.query.changePassword(userId, pass);
    }

    public async deleteUser(id: number): Promise<void> {
        await this.query.deleteEntityById(id);
    }
}
