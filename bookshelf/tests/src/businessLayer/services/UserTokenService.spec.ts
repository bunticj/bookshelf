import { expect } from "chai";
import { TestHelper } from "../testUtils/TestHelper.spec";
import { RoleType } from "../../../../app/src/businessLayer/enum/RoleType";
import { ErrorType } from "../../../../app/src/businessLayer/enum/ErrorType";
import { CustomError } from "../../../../app/src/businessLayer/model/CustomError";
import { restartRepos } from "../testUtils/mocks/MockServiceManager.spec";
import { serviceManager } from "../../../../app/src/businessLayer/services/ServiceManager";
import { UserTokenService } from "../../../../app/src/businessLayer/services/UserTokenService";

describe("UserTokenService", () => {
    let userTokenService: UserTokenService;
    const userId = TestHelper.testUserId;
    const refreshToken = TestHelper.testRefreshToken;
    beforeEach(() => {
        restartRepos();
        userTokenService = serviceManager.userTokenService;
    });

    describe("Create User Token", () => {
        it("Should create new user token data", async () => {
            // arrange
            // act
            const userToken = await userTokenService.createUserToken(userId, refreshToken);
            // assert
            expect(userToken).to.not.be.undefined;
            expect(userToken.refreshToken).to.be.equal(refreshToken);
        });
    });

    describe("Handle refresh token", () => {
        it("Should get new access and refresh token", async () => {
            // arrange
            // act
            const userToken = await userTokenService.handleRefreshToken(userId, refreshToken, RoleType.Author);
            // assert
            expect(userToken.refreshToken).to.not.be.equal(refreshToken);
        });

        it(`Should throw error: ${ErrorType[ErrorType.Unauthorized]}`, async () => {
            // arrange
            const invalidRefreshToken = "some invalid token";
            // act

            let customError: CustomError | undefined = undefined;
            try {
                await userTokenService.handleRefreshToken(userId, invalidRefreshToken, RoleType.Author);
            }
            catch (error) {
                customError = error as CustomError;
            }
            // assert
            expect(customError).to.not.be.undefined;
            expect(customError?.errorType).to.be.equal(ErrorType.Unauthorized);
        });
    });

});