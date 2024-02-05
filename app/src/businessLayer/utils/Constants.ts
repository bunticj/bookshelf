export class Constants {
    // database tables
    public static readonly userTableName = "user";
    public static readonly bookTableName = "book";
    public static readonly userTokenTableName = "user_token";

    // property names
    public static readonly idName = "id";
    public static readonly authorIdName = "authorId";
    public static readonly titleName = "title";
    public static readonly publisherName = "publisher";
    public static readonly roleName = "role";

    // configuration
    public static readonly bcryptSaltRounds = 10;
    public static readonly databaseConnectionLimit = 15;
    public static readonly accessTokenExpirationInSeconds = 600; // 10 mins
    public static readonly refreshTokenExpirationInSeconds = 3600; // 1h
}