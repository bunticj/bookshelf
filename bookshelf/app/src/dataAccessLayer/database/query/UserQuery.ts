
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
        const query = `INSERT into ${this.table} (email,firstName,lastName, password, role, status) VALUES (?, ?, ?, ?, ?, ?);`;
        const result = await DB.runQuery(query, [email, firstName, lastName, password, role, status]);
        const id = parseInt(result.insertId);
        data.id = id;
        return data;
    }

    public async updateEntityById(data: Partial<User>): Promise<void> {
        const { email, firstName, lastName, password, role, status, id } = data;
        const query = `UPDATE ${this.table} SET email = IFNULL(?, email), firstName = IFNULL(?, firstName),lastName = IFNULL(?, lastName),
        status = IFNULL(?, status, role = IFNULL(?, role) WHERE id = ?`;
        return await DB.runQuery(query, [email, firstName, lastName, password, role, status, id]);
    }

    public async changePassword(userId: number, password: string): Promise<void> {
        const query = `UPDATE ${this.table} SET password = ? WHERE id = ?`;
        return await DB.runQuery(query, [userId, password]);
    }
}