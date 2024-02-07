import { RoleType } from "../../../../app/src/businessLayer/enum/RoleType";
import { StatusType } from "../../../../app/src/businessLayer/enum/StatusType";
import { User } from "../../../../app/src/businessLayer/model/User";

export class TestHelper {
    public static getMockedUser(userId?: number, email?: string, password?: string): User {
        if (!email) email = TestHelper.testUserEmail;
        if (!userId) userId = TestHelper.testUserId;
        if (!password) password = TestHelper.testPass;
        const user = new User(email, "John", "Doe", password, RoleType.Author, StatusType.Active);
        user.id = userId;
        return user;
    }


    public static testUserId = 1;
    public static testUserEmail = "test@email.com";
    public static testPass = "testPass";

}