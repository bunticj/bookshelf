
import { User } from "../../../businessLayer/model/User";
import { Constants } from "../../../businessLayer/utils/Constants";
import { DB } from "../DatabaseConnection";
import { AbstractQuery } from "./AbstractQuery";
export class UserQuery extends AbstractQuery<User> {
    protected table: string;
    constructor() {
        super();
        this.table = Constants.userTableName;
    }

    public async createEntity(data: User): Promise<User> {
        const { email, firstName, lastName, password, role, status } = data;
        let query = `INSERT into ${this.table} (email,firstName,lastName, password, role, status) VALUES (?, ?, ?, ?, ?, ?);`;
        const result = await DB.runQuery(query, [email, firstName, lastName, password, role, status]);
        const id = parseInt(result.insertId);
        data.id = id;
        return data;
    }

    public async updateEntity(data: Partial<User>): Promise<void> {
        const { email, firstName, lastName, password, role, status, id } = data;
        let query = `UPDATE ${this.table} SET email = IFNULL(?, email), firstName = IFNULL(?, firstName),lastName = IFNULL(?, lastName),
        status = IFNULL(?, status, role = IFNULL(?, role) WHERE id = ?`;
        return await DB.runQuery(query, [email, firstName, lastName, password, role, status, id]);
    }

    public async deleteEntity(data: Partial<User>): Promise<void> {
        const query = `DELETE FROM ${this.table} WHERE id = ?;`;
        return await DB.runQuery(query, [data.id]);
    }
}