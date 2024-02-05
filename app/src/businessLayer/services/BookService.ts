import { BookRepository } from "../../dataAccessLayer/repository/BookRepository";
import { ErrorType } from "../enum/ErrorType";
import { StatusType } from "../enum/StatusType";
import { IPaginatedData } from "../interface/HelperInterface";
import { Book } from "../model/Book";
import { CustomError } from "../model/CustomError";

export class BookService {
    private repository: BookRepository;
    constructor(bookRepository: BookRepository) {
        this.repository = bookRepository;
    }

    public async getBookById(id: number): Promise<Book | undefined> {
        const book = await this.repository.getByBookId(id);
        return book;
    }

    public async getBooksByAuthorId(authorId: number, page: number, size: number): Promise<IPaginatedData<Book>> {
        const booksData = await this.repository.getBooksByAuthorId(authorId, page, size);
        return booksData;
    }

    public async assertUserIsOwner(userId: number, bookId: number): Promise<void> {
        const author = await this.repository.getBookAuthor(bookId);
        if (!author) throw new CustomError(ErrorType.NotFound, "Invalid bookId", { userId, bookId })
        if (author !== userId) throw new CustomError(ErrorType.NotFound, "User not book author", { userId, bookId })
    }

    public async createBook(title: string, publisher: string, authorId: number): Promise<Book> {
        const book = await this.repository.create(title, publisher, authorId);
        return book;
    }

    public async updateBookByBookId(book: Partial<Book>): Promise<void> {
        await this.repository.updateBookById(book);
    }

    public async updateBookStatusByAuthorId(authorId: number, status: StatusType): Promise<void> {
        await this.repository.updateBooksByAuthorId({ authorId, status });
    }

    public async deleteBook(bookId: number, authorId: number): Promise<void> {
        await this.repository.deleteBook(bookId);
    }




    // todo remove
    public async getAllBooks() {
        return await this.repository.getAllBooks()
    }
    public async getAllUsers() {
        return await this.repository.getAllUsers()

    }
    public async getAllTokens() {
        return await this.repository.getAllTokens()

    }
}
