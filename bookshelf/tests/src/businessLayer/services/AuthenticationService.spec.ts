import { expect, use } from "chai";
import { TestHelper } from "../testUtils/TestHelper.spec";
import { restartRepos } from "../testUtils/mocks/MockServiceManager.spec";
import { serviceManager } from "../../../../app/src/businessLayer/services/ServiceManager";
import { BookService } from "../../../../app/src/businessLayer/services/BookService";
import { CustomError } from "../../../../app/src/businessLayer/model/CustomError";
import { ErrorType } from "../../../../app/src/businessLayer/enum/ErrorType";
import { AuthenticationService } from "../../../../app/src/businessLayer/services/AuthenticationService";
import { RoleType } from "../../../../app/src/businessLayer/enum/RoleType";
import { TokenType } from "../../../../app/src/businessLayer/enum/TokenType";

describe("AuthenticationService", () => {
    let authenticationService: AuthenticationService;
    const userId = TestHelper.testUserId;
    beforeEach(() => {
        restartRepos();
        authenticationService = serviceManager.authenticationService;
    });

    describe("Sign token", () => {
        it("Should get access and refresh token", () => {
            // act
            const tokens = authenticationService.signAuthTokens(userId, RoleType.Author);
            // assert
            expect(tokens.accessToken).to.not.be.undefined;
            expect(tokens.refreshToken).to.not.be.undefined;

        });

    });

    describe("Verify JWT ", () => {
        it("Should get access token JWT payload", () => {
            // arrange
            const tokens = authenticationService.signAuthTokens(userId, RoleType.Author);
            // act
            const accessPayload = authenticationService.verifyJwt(tokens.accessToken, TokenType.Access);
            // assert
            expect(accessPayload.userId).to.be.equal(userId);
            expect(accessPayload.tokenType).to.be.equal(TokenType.Access);
            expect(accessPayload.role).to.be.equal(RoleType.Author);

        });
        it("Should get refresh token JWT payload", () => {
            // arrange
            const tokens = authenticationService.signAuthTokens(userId, RoleType.Author);
            // act
            const refreshPayload = authenticationService.verifyJwt(tokens.refreshToken, TokenType.Refresh);
            // assert
            expect(refreshPayload.userId).to.be.equal(userId);
            expect(refreshPayload.tokenType).to.be.equal(TokenType.Refresh);
            expect(refreshPayload.role).to.be.equal(RoleType.Author);

        });
        it(`Should throw error: ${ErrorType[ErrorType.Unauthorized]}`, async () => {
            // arrange
            // act
            let customError: CustomError | undefined = undefined;
            try {
                authenticationService.verifyJwt("", TokenType.Access);
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