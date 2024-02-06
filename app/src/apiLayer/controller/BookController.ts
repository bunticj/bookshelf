import express from 'express';
import { CustomError } from "../../businessLayer/model/CustomError";
import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { ErrorHandler } from '../../businessLayer/utils/ErrorHandler';
import { Book } from '../../businessLayer/model/Book';
import { serviceManager } from '../../businessLayer/services/ServiceManager';
import { validator } from '../validator/Validator';
import { RoleType } from '../../businessLayer/enum/RoleType';
import { ITokenPayload } from '../../businessLayer/interface/HelperInterface';
import { StatusType } from '../../businessLayer/enum/StatusType';
class BookController {
    public async createBook(req: express.Request, res: express.Response) {
        try {
            const userId = res.locals.jwtPayload.userId;
            validator.validateBookStrings(req.body, false);
            const { title, publisher } = req.body as Book;
            const book = await serviceManager.bookService.createBook(title, publisher, userId);
            res.status(200).send({ data: book });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { ...req.body });
            res.status(error.status).send({ error: error.data });

        }
    }

    public async getByBookId(req: express.Request, res: express.Response) {
        try {
            const bookId = +req.params.bookId;
            if (typeof bookId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid bookId");
            const { userId, role } = res.locals.jwtPayload as ITokenPayload;
            const book = await serviceManager.bookService.getBookById(bookId);
            if (!book) throw new CustomError(ErrorType.NotFound, "Book not found", { bookId });
            if (role !== RoleType.Admin && book?.authorId !== userId) throw new CustomError(ErrorType.Forbidden, "Can't get unowned books", { authorId: book.authorId, userId });
            res.status(200).send({ data: book });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }
    }

    public async getAuthorBooks(req: express.Request, res: express.Response) {
        try {
            const authorId = +req.params.userId;
            if (typeof authorId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid author");
            const [page, size] = validator.validatePaginationQuery(req.query.page, req.query.size);
            const { userId, role } = res.locals.jwtPayload as ITokenPayload;
            if (role !== RoleType.Admin && authorId !== userId) throw new CustomError(ErrorType.Forbidden, "Can't get unowned books", { authorId, userId })
            const books = await serviceManager.bookService.getBooksByAuthorId(authorId, page, size);
            res.status(200).send({ data: books });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }
    }

    public async updateBook(req: express.Request, res: express.Response) {
        try {
            const bookId = +req.params.bookId;
            const book = req.body as Partial<Book>;
            if (typeof bookId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid bookId");
            validator.validateBookStrings(req.body, true);
            validator.validateEnums(req.body.status as StatusType, Object.values(StatusType))
            const { userId, role } = res.locals.jwtPayload as ITokenPayload;
            if (role !== RoleType.Admin) await serviceManager.bookService.assertUserIsOwner(userId, bookId);
            await serviceManager.bookService.updateBookByBookId(book);
            res.status(200).send({ data: "OK" });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }
    }

    public async deleteBook(req: express.Request, res: express.Response) {
        try {
            const bookId = +req.params.bookId;
            if (typeof bookId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid bookId");
            const { userId, role } = res.locals.jwtPayload as ITokenPayload;
            if (role !== RoleType.Admin) await serviceManager.bookService.assertUserIsOwner(userId, bookId);
            await serviceManager.bookService.deleteBook(bookId, userId);
            res.status(200).send({ data: "OK" });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(error.status).send({ error: error.data });
        }
    }

    // remove later
    public async allBooksDebug(req: express.Request, res: express.Response) {
        const data = await serviceManager.bookService.getAllBooks();
        res.status(200).send({ data });
    }
    public async allUsersDebug(req: express.Request, res: express.Response) {
        const data = await serviceManager.bookService.getAllUsers();
        res.status(200).send({ data });

    }
    public async allTokensDebug(req: express.Request, res: express.Response) {
        const data = await serviceManager.bookService.getAllTokens();
        res.status(200).send({ data });
    }
}

export const bookController = new BookController();