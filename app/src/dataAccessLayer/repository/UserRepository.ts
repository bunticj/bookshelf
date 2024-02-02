import { RoleType } from "../../businessLayer/enum/RoleType";
import { StatusType } from "../../businessLayer/enum/StatusType";
import { User } from "../../businessLayer/model/User";
import { UserQuery } from "../database/query/UserQuery";
export class UserRepository {
    private query: UserQuery;
    constructor() {
        this.query = new UserQuery();
    }

    public async createUser(email: string, password: string, firstName: string, lastName: string, role?: RoleType, status?: StatusType): Promise<User> {
        let user = new User(email, firstName, lastName, password, role, status);
        user = await this.query.createEntity(user);
        return user;
    }

    public async getByUserId(id: number): Promise<User | undefined> {
        const user = await this.query.getEntity<User>("id", id);
        if (!user) return;
        return user;
    }

    public async getByEmail(email: string): Promise<User | undefined> {
        const user = await this.query.getEntity<User>("email", email);
        if (!user) return;
        return user;
    }

    public async updateUser(data: Partial<User>): Promise<void> {
        await this.query.updateEntity(data);
    }
}
