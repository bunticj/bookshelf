import { RoleType } from "../../../../app/src/businessLayer/enum/RoleType";
import { StatusType } from "../../../../app/src/businessLayer/enum/StatusType";
import { User } from "../../../../app/src/businessLayer/model/User";
import { Book } from "../../../../app/src/businessLayer/model/Book";
import { UserToken } from "../../../../app/src/businessLayer/model/UserToken";

export class TestHelper {
    public static getMockedUser(userData: Partial<User>): User {
        if (!userData.email) userData.email = TestHelper.testUserEmail;
        if (!userData.id) userData.id = TestHelper.testUserId;
        if (!userData.password) userData.password = TestHelper.testPass;
        if (!userData.firstName) userData.firstName = TestHelper.testFirstName;
        if (!userData.lastName) userData.lastName = TestHelper.testLastName;
        if (!userData.status) userData.status = StatusType.Active;
        if (!userData.role) userData.role = RoleType.Author;
        return userData as User;
    }

    public static getMockedBook(bookData: Partial<Book>): Book {
        if (!bookData.id) bookData.id = TestHelper.testBookId;
        if (!bookData.title) bookData.title = TestHelper.testTitle;
        if (!bookData.publisher) bookData.publisher = TestHelper.testPublisher;
        if (!bookData.authorId) bookData.authorId = TestHelper.testUserId;
        if (!bookData.status) bookData.status = StatusType.Active;
        return bookData as Book;
    }

    public static getMockedUserToken(userTokenData: Partial<UserToken>): UserToken {
        if (!userTokenData.id) userTokenData.id = TestHelper.testBookId;
        if (!userTokenData.refreshToken) userTokenData.refreshToken = TestHelper.testRefreshToken;
        if (!userTokenData.createdAt) userTokenData.createdAt = Date.now();
        if (!userTokenData.userId) userTokenData.userId = TestHelper.testUserId;
        return userTokenData as UserToken;
    }

    // TestUser
    public static testUserId = 1;
    public static testUserEmail = "test@email.com";
    public static testPass = "testPass";
    public static testFirstName = "John";
    public static testLastName = "Doe";

    // TestBook
    public static testBookId = 1;
    public static testTitle = "1984";
    public static testPublisher = "George Orwell";

    // TestUserToken
    public static testUserTokenId = 1;
    public static testRefreshToken = "Some refresh token value";
}