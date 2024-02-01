
import { IQuery } from "../../../businessLayer/interface/IQuery";
import { UserAccount } from "../../../businessLayer/model/UserAccount";
import { DB } from "../DatabaseConnection";

export class UserAccountQuery implements IQuery<UserAccount> {

    public async createEntity(userAccount: UserAccount): Promise<void> {
        const { email, password, role_type, status_type } = userAccount;
        const query = `INSERT into user(email, password, role_type, status_type) VALUES (?, ?, ?, ?);`;
        await DB.runQuery(query, [email, password, role_type, status_type]);
    }

    public async getEntityByString(stringId: string): Promise<UserAccount | undefined> {
        const query = `SELECT * from user WHERE email = ?;`;
        const result: UserAccount[] = await DB.runQuery(query, [stringId]);
        return result[0];
    }

    public async getEntityByNumber(numberId: number): Promise<UserAccount | undefined> {
        const query = `SELECT * from user_account WHERE id = ?;`;
        const result: UserAccount[] = await DB.runQuery(query, [numberId]);
        return result[0];
    }

    public async updateEntity(data: UserAccount): Promise<UserAccount> {
        const query = `UPDATE user SET balance = balance + ?, win = win + ? WHERE userId = ?;`;
        return await DB.runQuery(query, []);
    }

    public async deleteEntity(id: number): Promise<void> {

    }

}

