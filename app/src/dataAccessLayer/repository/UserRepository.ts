import { UserAccount } from "../../businessLayer/model/UserAccount";
import { Constants } from "../../businessLayer/utils/Constants";
import { UserAccountQuery } from "../database/query/UserAccountQuery";
export class UserAccountRepository {
    private query: UserAccountQuery;
    constructor() {
        this.query = new UserAccountQuery(Constants.userAccountTableName);
    }

    public async create(user: UserAccount): Promise<any> {
        return await this.query.createEntity(user);
    }


    public async getByUserId(id: number): Promise<UserAccount | undefined> {
        const user = await this.query.getEntity<UserAccount>("id", id);
        if (!user) return;
        return user;
    }

    public async getByEmail(email: string): Promise<UserAccount | undefined> {
        const user = await this.query.getEntity<UserAccount>("email", email);
        if (!user) return;
        return user;
    }

    public async update(userId: number, transactionAmount: number): Promise<any> {
        //SOME UPDATE LOGIC
    }
}
