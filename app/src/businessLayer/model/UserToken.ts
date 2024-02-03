export class UserToken {
    public id?: number;
    public userId: number;
    public refreshToken: string;
    public createdAt?: string;
    constructor(userId: number, refreshToken: string) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}