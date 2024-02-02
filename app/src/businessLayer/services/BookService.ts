import { BookRepository } from "../../dataAccessLayer/repository/BookRepository";
import { Book } from "../model/Book";
import { StatusType } from "../enum/StatusType";

export class BookService {
    private repository: BookRepository;
    constructor(bookRepository: BookRepository) {
        this.repository = bookRepository;
    }

    public async getBookById(id: number): Promise<Book | undefined> {
        const book = await this.repository.getByBookId(id);
        return book;
    }

    public async getByAuthorId(authorId: number): Promise<Book | undefined> {
        const book = await this.repository.getByAuthorId(authorId);
        return book;
    }

    public async createBook(title: string, publisher: string, authorId: number, statusType?: StatusType): Promise<Book> {
        const book = await this.repository.create(title, publisher, authorId, statusType);
        return book;
    }

    public async updateBook(book: Partial<Book>): Promise<void> {
        await this.repository.updateBook(book)
    }

    public async deleteBook(bookId: number, authorId: number): Promise<void> {
        await this.repository.deleteBook(bookId, authorId)
    }
}
