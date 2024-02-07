import { UserService } from "../../../../app/src/businessLayer/services/UserService"
import { MockUserRepository } from "../../mocks/MockUserRepository.spec";
import { TestHelper } from "../testUtils/TestHelper.spec";
import chai from "chai";
const expect = chai.expect;

describe.only("UserService", () => {
    let userService: UserService;
    const userId = TestHelper.testUserId;
    beforeEach(() => {
        userService = new UserService(new MockUserRepository());
    });

    describe("Get By Email", () => {
        it("Should get user by email", async () => {
            // arrange
            const email = TestHelper.testUserEmail;

            // act
            const user = await userService.getByEmail(email)

            // assert
            expect(user?.id).to.be.equal(userId);
        });
        it("Should return undefined for unexisting email", async () => {
            const email = "Some jibberish email"

            // act
            const user = await userService.getByEmail(email)

            // assert
            expect(user).to.be.undefined;
        });
    });


    describe("Get By UserId", () => {
        it("Should get user by id", () => {
            // arrange
            // act
            // assert
        });
        it("Should return undefined for unexisting user", () => {
            // arrange
            // act
            // assert
        });
    });


    describe("Get Users", () => {
        it("Should get users and pagination", () => {
            // arrange
            // act
            // assert
        });

    });
    describe("Create User", () => {
        it("Should create new user", () => {
            // arrange
            // act
            // assert
        });
    });

    describe("Update User", () => {
        it("Should update user", () => {
            // arrange
            // act
            // assert
        });
    });

    describe("Delete User", () => {
        it("Should delete user", () => {
            // arrange
            // act
            // assert
        });
    });

    describe("Change Password", () => {
        it("Should change users password", () => {
            // arrange
            // act
            // assert
        });
    });

    describe("Init admin", () => {
        it("Should get AdminId", () => {
            // arrange
            // act
            // assert
        });
    });
});
