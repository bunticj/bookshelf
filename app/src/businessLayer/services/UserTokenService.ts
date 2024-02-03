import { UserTokenRepository } from "../../dataAccessLayer/repository/UserTokenRepository";

import { UserToken } from "../model/UserToken";
export class UserTokenService {
    private repository: UserTokenRepository;
    constructor(userRepository: UserTokenRepository) {
        this.repository = userRepository;
    }

    public async getTokenByUserId(userId: number): Promise<UserToken | undefined> {
        const userData = await this.repository.getTokenByUserId(userId);
        return userData;
    }

    public async createUserToken(userId: number, refreshToken: string): Promise<UserToken> {
        const userToken = await this.repository.createUserToken(userId, refreshToken);
        return userToken;
    }

    public async deleteUserToken(userId: number): Promise<void> {
        await this.repository.deleteTokenByUserId(userId)
    }

    public async updateUserToken(userId: number): Promise<void> {
        await this.repository.deleteTokenByUserId(userId)
    }

  
}