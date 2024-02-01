
import { UserAccount } from "../../../businessLayer/model/UserAccount";
import { DB } from "../DatabaseConnection";
import { BaseQuery } from "./BaseQuery";

export class UserAccountQuery extends BaseQuery {
    protected table: string;
    constructor(tableName: string) {
        super();
        this.table = tableName;
    }
    public async createEntity<T>(data: T): Promise<void> {
        const { email, password, role_type, status_type } = data as UserAccount;
        const query = `INSERT into ${this.table}(email, password, role_type, status_type) VALUES (?, ?, ?, ?);`;
        await DB.runQuery(query, [email, password, role_type, status_type]);
    }

    public async updateEntity<T>(data: T): Promise<T> {
        const query = `UPDATE ${this.table} SET balance = balance + ?, win = win + ? WHERE userId = ?;`;
        return await DB.runQuery(query, []);
    }

}

