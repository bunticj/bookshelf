import { RoleType } from "../../../../../app/src/businessLayer/enum/RoleType";
import { StatusType } from "../../../../../app/src/businessLayer/enum/StatusType";
import { IDictionary, IPaginatedData } from "../../../../../app/src/businessLayer/interface/HelperInterface";
import { User } from "../../../../../app/src/businessLayer/model/User";
import { UserRepository } from "../../../../../app/src/dataAccessLayer/repository/UserRepository";
import { TestHelper } from "../TestHelper.spec";
export class MockUserRepository extends UserRepository {
    private users: IDictionary<User> = {} //{ userId : User }
    private counter = 1;
    constructor() {
        super();
        this.init();
    }
    private init() {
        const user = TestHelper.getMockedUser({});
        this.users[user.id!] = user;
    }

    public async create(email: string, password: string, firstName: string, lastName: string, role?: RoleType, status?: StatusType): Promise<User> {
        const user = new User(email, firstName, lastName, password, role, status);
        this.counter++;
        user.id = this.counter;
        this.users[user.id] = user;
        return user;
    }

    public async getByUserId(id: number): Promise<User | undefined> {
        return this.users[id];
    }

    public async getUsers(page: number, size: number): Promise<IPaginatedData<User>> {
        const usersArr = Object.values(this.users);
        const paginated = { page: 1, totalPages: usersArr.length, data: usersArr };
        return paginated;
    }

    public async getByEmail(email: string): Promise<User | undefined> {
        const [user] = Object.values(this.users).filter(user => user.email === email)
        return user;
    }

    public async getAdminId(): Promise<number | undefined> {
        const [user] = Object.values(this.users).filter(user => user.role === RoleType.Admin)
        return user?.id;
    }

    public async updateUser(data: Partial<User>): Promise<void> {
        const user = this.users[data.id!]
        for (const key in data) {
            (user as any)[key] = (data as any)[key];
        }
    }

    public async changePassword(userId: number, pass: string): Promise<void> {
        const user = this.users[userId]
        user.password = pass;
    }

    public async deleteUser(id: number): Promise<void> {
        delete this.users[id];
    }
}
