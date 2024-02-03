import { StatusType } from "../../businessLayer/enum/StatusType";
import { Book } from "../../businessLayer/model/Book";
import { BookQuery } from "../database/query/BookQuery";
export class BookRepository {
    private query: BookQuery;
    constructor() {
        this.query = new BookQuery();
    }

    public async create(title: string, publisher: string, authorId: number, status?: StatusType): Promise<Book> {
        let book = new Book(authorId, title, publisher, status);
        book = await this.query.createEntity(book);
        return book;
    }

    public async getByBookId(id: number): Promise<Book | undefined> {
        const book = await this.query.getEntity("id", id);
        if (!book) return;
        return book;
    }

    public async getByAuthorId(authorId: number): Promise<Book | undefined> {
        const book = await this.query.getEntity("authorId", authorId);
        if (!book) return;
        return book;
    }

    public async updateBook(data: Partial<Book>): Promise<void> {
        await this.query.updateEntity(data);
    }

    public async deleteBook(book_id: number, authorId: number): Promise<void> {
        await this.query.deleteEntity({ book_id, authorId });

    }
}
