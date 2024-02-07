import { expect } from "chai";
import { UserService } from "../../../../app/src/businessLayer/services/UserService"
import { TestHelper } from "../testUtils/TestHelper.spec";
import { MockUserRepository } from "../testUtils/mocks/MockUserRepository.spec";
import EnvConfig from "../../../../app/src/businessLayer/utils/EnvConfig";
import { RoleType } from "../../../../app/src/businessLayer/enum/RoleType";
import { restartRepos } from "../testUtils/mocks/MockServiceManager.spec";
import { serviceManager } from "../../../../app/src/businessLayer/services/ServiceManager";

describe("UserService", () => {
    let userService: UserService 
    const userId = TestHelper.testUserId;
    const email = TestHelper.testUserEmail;

    beforeEach(() => {
        restartRepos();
        userService = serviceManager.userService;
    });

    describe("Get By Email", () => {
        it("Should get user by email", async () => {
            // act
            const user = await userService.getByEmail(email);
            // assert
            expect(user?.id).to.be.equal(userId);
        });
        it("Should return undefined for unexisting email", async () => {
            // arrange
            const invalidEmail = "Some jibberish email"
            // act
            const user = await userService.getByEmail(invalidEmail)
            // assert
            expect(user).to.be.undefined;
        });
    });

    describe("Get By UserId", () => {
        it("Should get user by id", async () => {
            // act
            const user = await userService.getByUserId(userId)
            // assert
            expect(user?.email).to.be.equal(email);
        });
        it("Should return undefined for unexisting userId", async () => {
            const invalidUserId = 1234565;
            // act
            const user = await userService.getByUserId(invalidUserId)
            // assert
            expect(user).to.be.undefined;
        });
    });

    describe("Create User", () => {
        it("Should create new user", async () => {
            // arrange
            const mail = "mail@gmail.com"
            // act
            const user = await userService.createUser(mail, "pass", "name", "lastname");
            // assert
            expect(user).to.not.be.undefined;
            expect(user.email).to.be.equal(mail);
        });
    });

    describe("Update User", () => {
        it("Should update user", async () => {
            // arrange
            const newName = "Updated name";
            // act
            await userService.updateUser({ id: userId, firstName: newName });
            const user = await userService.getByUserId(userId);
            // assert
            expect(user?.firstName).to.be.equal(newName);
        });
    });

    describe("Get Users", () => {
        it("Should get users and pagination", async () => {
            // arrange
            await userService.createUser("meeail@gmail.com", "pass", "name", "lastname");
            await userService.createUser("meeail2@gmail.com", "pass", "name", "lastname");
            const pageNum = 1;
            // act
            const users = await userService.getUsers(pageNum, 5);
            // assert
            expect(users.page).to.be.equal(pageNum);
            expect(users.data.length).to.be.equal(3);
        });
    });

    describe("Delete User", () => {
        it("Should delete user", async () => {
            // arrange
            // act
            await userService.deleteUser(userId);
            const user = await userService.getByUserId(userId);
            // assert
            expect(user).to.be.undefined;
        });
    });

    describe("Change Password", () => {
        it("Should change users password", async () => {
            // arrange
            const newPass = "newPass"
            // act
            await userService.changePassword(userId, newPass);
            const user = await userService.getByUserId(userId);
            // assert
            expect(user?.password).to.be.equal(newPass);
        });
    });

    describe("Init admin",  () => {
        it("Should create Admin account if doesnt exist", async () => {
            // arrange
            const adminEmail = EnvConfig.DEFAULT_ADMIN_EMAIL;
            // act
            await userService.initAdmin();
            const user = await userService.getByEmail(adminEmail);

            // assert
            expect(user).to.not.be.undefined;
            expect(user?.role).to.be.equal(RoleType.Admin);
        });

    });

});