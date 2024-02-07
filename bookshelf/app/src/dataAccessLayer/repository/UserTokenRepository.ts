import { UserToken } from "../../businessLayer/model/UserToken";
import { UserTokenQuery } from "../database/query/UserTokenQuery";
export class UserTokenRepository {
    private query: UserTokenQuery;
    constructor() {
        this.query = new UserTokenQuery();
    }

    public async create(userId: number, refreshToken: string): Promise<UserToken> {
        let userToken = new UserToken(userId, refreshToken);
        userToken = await this.query.createEntity(userToken);
        return userToken;
    }

    public async getTokenByUserId(userId: number): Promise<UserToken | undefined> {
        const user = await this.query.getEntity("userId", userId);
        if (!user) return;
        return user;
    }

    public async deleteExpiredTokens() {
        await this.query.clearExpired();
    }

    public async deleteTokenByUserId(userId: number): Promise<void> {
        await this.query.deleteEntity(userId);
    }
}
