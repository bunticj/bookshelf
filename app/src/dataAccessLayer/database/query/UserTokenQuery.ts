
import { UserToken } from "../../../businessLayer/model/UserToken";
import { Constants } from "../../../businessLayer/utils/Constants";
import { DB } from "../DatabaseConnection";
import { AbstractQuery } from "./AbstractQuery";
export class UserTokenQuery extends AbstractQuery<UserToken> {
    protected table: string;
    constructor() {
        super();
        this.table = Constants.userTokenTableName;
    }

    public async createEntity(data: UserToken): Promise<UserToken> {
        const { userId, refreshToken } = data;
        let query = `INSERT into ${this.table} (userId, refreshToken) VALUES (?, ?);`;
        const result = await DB.runQuery(query, [userId, refreshToken]);
        const id = parseInt(result.insertId);
        data.id = id;
        return data;
    }

    public async clearExpired(): Promise<void> {
        const query = `DELETE FROM ${this.table} WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 HOUR)`;
        await DB.runQuery(query, []);
    }

    public async updateEntityById(data: Partial<UserToken>): Promise<void> {
        const { refreshToken, userId } = data;
        let query = `UPDATE ${this.table} SET refreshToken = ?, createdAt = CURRENT_TIMESTAMP() WHERE userId = ?`;
        return await DB.runQuery(query, [refreshToken, userId]);
    }

    public async deleteEntity(userId: number): Promise<void> {
        const query = `DELETE FROM ${this.table} WHERE userId = ?;`;
        return await DB.runQuery(query, [userId]);
    }
}