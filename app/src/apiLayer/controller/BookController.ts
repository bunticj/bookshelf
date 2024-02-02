import express from 'express';
import { CustomError } from "../../businessLayer/model/CustomError";
import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { ErrorHandler } from '../../businessLayer/utils/ErrorHandler';
import { validateStringLengths, validateStrings } from '../validator/Validator';
import { IDictionary } from '../../businessLayer/interface/HelperInterface';
import { Book } from '../../businessLayer/model/Book';
import { serviceManager } from '../../businessLayer/services/ServiceManager';
class BookController {

    private static validateBookBody(body: IDictionary) {
        const stringsToValidate = ["title", "publisher"];
        validateStrings(stringsToValidate, body);
        validateStringLengths(stringsToValidate, [32])
    }

    public async createBook(req: express.Request, res: express.Response) {
        try {
            // get id from jwt token
            let id = 1;
            BookController.validateBookBody(req.body);
            const { title, publisher } = req.body as Book;
            const book = await serviceManager.bookService.createBook(title, publisher, id);
            res.status(200).send(book);
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { ...req.body });
            res.status(401).send(error);
        }
    }

    public async getByBookId(req: express.Request, res: express.Response) {
        try {
            const bookId = +req.params.bookId;
            if (typeof bookId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid book id");
            const book = await serviceManager.bookService.getBookById(bookId);
            if (!book) throw new CustomError(ErrorType.NotFound, "Book not found", { bookId });
            res.status(200).send(book);
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(400).send(error);

        }
    }

    public async updateBook(req: express.Request, res: express.Response) {
        try {
            const bookId = +req.params.bookId;
            const book = req.body as Partial<Book>
            if (typeof bookId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid book id");
            await serviceManager.bookService.updateBook(book);
            res.status(200).send({ message: "OK" });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(400).send(error);
        }
    }

    public async deleteBook(req: express.Request, res: express.Response) {
        try {
            const userId = 1; // extract from token
            const bookId = +req.params.bookId;
            if (typeof bookId !== "number") throw new CustomError(ErrorType.BadRequest, "Invalid book id");
            await serviceManager.bookService.deleteBook(bookId, userId);
            res.status(200).send({ message: "OK" });
        }
        catch (err) {
            const error = ErrorHandler.catchError(err as Error, { url: req.originalUrl });
            res.status(400).send(error);
        }
    }
}

export const bookController = new BookController();