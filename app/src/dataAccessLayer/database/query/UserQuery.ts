
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
        const { email, first_name, last_name, password, role_type, status_type } = data as User;
        let query = `INSERT into ${this.table} (email,first_name,last_name, password, role_type, status_type) VALUES (?, ?, ?, ?, ?, ?);`;
        const result = await DB.runQuery(query, [email, first_name, last_name, password, role_type, status_type]);
        const id = parseInt(result.insertId);
        (data as any)["id"] = id;
        return data;
    }

    public async updateEntity(data: Partial<User>): Promise<void> {
        const { email, first_name, last_name, password, role_type, status_type, id } = data;
        let query = `UPDATE ${this.table} SET email = IFNULL(?, email), first_name = IFNULL(?, first_name),last_name = IFNULL(?, last_name),
        status_type = IFNULL(?, status_type, role_type = IFNULL(?, role_type) WHERE id = ?`;
        return await DB.runQuery(query, [email, first_name, last_name, password, role_type, status_type, id]);
    }

    public async deleteEntity(data: Partial<User>): Promise<void> {
        const query = `DELETE FROM ${this.table} WHERE id = ?;`;
        return await DB.runQuery(query, [data.id]);
    }
}