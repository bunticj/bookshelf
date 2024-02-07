import { expect, use } from "chai";
import { TestHelper } from "../testUtils/TestHelper.spec";
import EnvConfig from "../../../../app/src/businessLayer/utils/EnvConfig";
import { RoleType } from "../../../../app/src/businessLayer/enum/RoleType";
import { restartRepos } from "../testUtils/mocks/MockServiceManager.spec";
import { serviceManager } from "../../../../app/src/businessLayer/services/ServiceManager";
import { BookService } from "../../../../app/src/businessLayer/services/BookService";
import { CustomError } from "../../../../app/src/businessLayer/model/CustomError";
import { ErrorType } from "../../../../app/src/businessLayer/enum/ErrorType";

describe("BookService", () => {
    let bookService: BookService;
    const userId = TestHelper.testUserId;
    const bookId = TestHelper.testBookId;
    const publisher = TestHelper.testPublisher;
    beforeEach(() => {
        restartRepos();
        bookService = serviceManager.bookService;
    });

    describe("Get By BookId", () => {
        it("Should get user by email", async () => {
            // act
            const book = await bookService.getBookById(bookId);
            // assert
            expect(book?.publisher).to.be.equal(publisher);
        });
        it("Should return undefined for unexisting email", async () => {
            // arrange
            const invalidId = 1234;
            // act
            const book = await bookService.getBookById(invalidId);
            // assert
            expect(book).to.be.undefined;
        });
    });

    describe("Create Book", () => {
        it("Should create new book", async () => {
            // arrange
            const bookTitle = "The Catcher in the Rye"
            const publisher = "J.D.Salinger"
            // act
            const book = await bookService.createBook(bookTitle, publisher, userId);
            // assert
            expect(book).to.not.be.undefined;
            expect(book.title).to.be.equal(bookTitle);
        });
    });


    describe("Get Books by UserId", () => {
        it("Should get books and pagination", async () => {
            //arrange
            const userId = 10;
            const mockData = TestHelper.getMockedBook({});
            await Promise.all([bookService.createBook(mockData.title, mockData.publisher, userId),
            bookService.createBook(mockData.title, mockData.publisher, userId),
            bookService.createBook(mockData.title, mockData.publisher, userId)]);

            // act
            const books = await bookService.getBooksByAuthorId(userId, 1, 10);
            // assert
            expect(books.data[0].authorId).to.be.equal(userId);
            expect(books.data.length).to.be.equal(3);
        });
        it("Should return empty array and pagination", async () => {
            const invalidUserId = 1234565;
            // act
            const paginatedData = await bookService.getBooksByAuthorId(invalidUserId, 1, 5)
            // assert
            expect(paginatedData.data.length).to.be.equal(0);
        });
    });


    describe("Update Book", () => {
        it("Should update book", async () => {
            // arrange
            const newTitle = "Updated titles";
            // act
            await bookService.updateBookByBookId({ id: bookId, title: newTitle });
            const book = await bookService.getBookById(bookId);
            // assert
            expect(book?.title).to.be.equal(newTitle);
        });
    });

    describe("Delete Book", () => {
        it("Should delete book", async () => {
            // arrange
            // act
            await bookService.deleteBook(bookId);
            const book = await bookService.getBookById(bookId);
            // assert
            expect(book).to.be.undefined;
        });
    });


    describe("Assert User is owner", () => {
        it("Should not throw error", async () => {
            // arrange
            // act
            let customError: CustomError | undefined = undefined;
            try {
                await bookService.assertUserIsOwner(userId, bookId);
            }
            catch (error) {
                customError = error as CustomError;
            }
            // assert
            expect(customError).to.be.undefined;
        });

        it(`Should throw error: ${ErrorType[ErrorType.NotFound]}`, async () => {
            // arrange
            const invalidBookId = 555;
            // act
            let customError: CustomError | undefined = undefined;
            try {
                await bookService.assertUserIsOwner(userId, invalidBookId);
            }
            catch (error) {
                customError = error as CustomError;
            }
            // assert
            expect(customError).to.not.be.undefined;
            expect(customError?.errorType).to.be.equal(ErrorType.NotFound);
        });

        it(`Should throw error: ${ErrorType[ErrorType.Forbidden]}`, async () => {
            // arrange
            const invalidUserId = 555;
            
            // act
            let customError: CustomError | undefined = undefined;
            try {
                await bookService.assertUserIsOwner(invalidUserId, bookId);
            }
            catch (error) {
                customError = error as CustomError;
            }
            // assert
            expect(customError).to.not.be.undefined;
            expect(customError?.errorType).to.be.equal(ErrorType.Forbidden);
        });
    });
});