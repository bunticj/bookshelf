import { IDictionary } from "../../../app/src/businessLayer/interface/HelperInterface";
import { UserToken } from "../../../app/src/businessLayer/model/UserToken";
import { UserTokenRepository } from "../../../app/src/dataAccessLayer/repository/UserTokenRepository"
export class MockUserTokenRepository extends UserTokenRepository {
    private userTokens: IDictionary<UserToken>; // {userId : UserToken}
    private counter = 0;
    constructor() {
        super();
    }

    public async create(userId: number, refreshToken: string): Promise<UserToken> {
        const userToken = new UserToken(userId, refreshToken);
        this.counter++;
        userToken.createdAt = Date.now();
        userToken.id = this.counter;
        this.userTokens[userId] = userToken;
        return userToken;
    }

    public async getTokenByUserId(userId: number): Promise<UserToken | undefined> {
        return this.userTokens[userId];
    }

    public async deleteExpiredTokens() {

    }

    public async deleteTokenByUserId(userId: number): Promise<void> {
        delete this.userTokens[userId];
    }
}
