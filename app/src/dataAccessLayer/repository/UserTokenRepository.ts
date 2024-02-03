import { UserToken } from "../../businessLayer/model/UserToken";
import { UserTokenQuery } from "../database/query/UserTokenQuery";
export class UserTokenRepository {
    private query: UserTokenQuery;
    constructor() {
        this.query = new UserTokenQuery();
    }

    public async createUserToken(userId: number, refreshToken: string): Promise<UserToken> {
        let userToken = new UserToken(userId, refreshToken);
        userToken = await this.query.createEntity(userToken);
        return userToken;
    }

    public async getTokenByUserId(userId: number): Promise<UserToken | undefined> {
        const user = await this.query.getEntity("userId", userId);
        if (!user) return;
        return user;
    }

    public async deleteTokenByUserId(userId: number): Promise<void> {
        await this.query.deleteEntity({ userId });
    }

    public async updateToken(userId: number, refreshToken: string): Promise<void> {
        await this.query.updateEntity({ refreshToken, userId });
    }
}
