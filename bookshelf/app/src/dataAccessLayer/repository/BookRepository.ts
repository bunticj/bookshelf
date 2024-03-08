import { StatusType } from "../../businessLayer/enum/StatusType";
import { IPaginatedData } from "../../businessLayer/interface/HelperInterface";
import { Book } from "../../businessLayer/model/Book";
import { Constants } from "../../businessLayer/utils/Constants";
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
        const book = await this.query.getEntity(Constants.idName, id);
        if (!book) return;
        return book;
    }

    public async getBooksByAuthorId(authorId: number, page: number, size: number): Promise<IPaginatedData<Book>> {
        const booksData = await this.query.getPaginatedData(page, size, Constants.authorIdName, authorId);
        return booksData;
    }

    public async updateBookById(data: Partial<Book>): Promise<void> {
        await this.query.updateEntityById(data);
    }

    public async updateBooksByAuthorId(data: Partial<Book>): Promise<void> {
        await this.query.updateEntitiesByAuthorId(data);
    }

    public async deleteBook(id: number): Promise<void> {
        await this.query.deleteEntityById(id);
    }

    public async getBookAuthor(bookId: number): Promise<number | undefined> {
        const authorId = await this.query.getSingleColumn<number, number>(Constants.authorIdName, Constants.idName, bookId);
        return authorId;
    }

}
