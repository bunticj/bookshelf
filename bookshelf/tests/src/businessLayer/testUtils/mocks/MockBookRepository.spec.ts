import { StatusType } from "../../../../../app/src/businessLayer/enum/StatusType";
import { IDictionary, IPaginatedData } from "../../../../../app/src/businessLayer/interface/HelperInterface";
import { Book } from "../../../../../app/src/businessLayer/model/Book";
import { TestHelper } from "../TestHelper.spec";
import { BookRepository } from "../../../../../app/src/dataAccessLayer/repository/BookRepository";

export class MockBookRepository extends BookRepository {
    private books: IDictionary<Book> = {}; // { bookId : Book }
    private counter = 1;
    constructor() {
        super();
        this.init();
    }
    private init() {
        const book = TestHelper.getMockedBook({});
        this.books[book.id!] = book;
    }

    public async create(title: string, publisher: string, authorId: number, status?: StatusType): Promise<Book> {
        let book = new Book(authorId, title, publisher, status);
        this.counter++;
        book.id = this.counter;
        this.books[book.id] = book;
        return book;
    }

    public async getByBookId(id: number): Promise<Book | undefined> {
        return this.books[id];
    }

    public async getBooksByAuthorId(authorId: number, page: number, size: number): Promise<IPaginatedData<Book>> {
        const booksArr = Object.values(this.books).filter(book => book.authorId === authorId);
        const paginated: IPaginatedData<Book> = { page: 1, totalPages: booksArr.length, data: booksArr };
        return paginated;

    }

    public async updateBookById(data: Partial<Book>): Promise<void> {
        const book = this.books[data.id!]
        for (const key in data) {
            (book as any)[key] = (data as any)[key];
        }
    }

    public async updateBooksByAuthorId(data: Partial<Book>): Promise<void> {
        for (const key in this.books) {
            const book = this.books[key];
            if (book.authorId === data.authorId) {
                for (const key in data) {
                    (book as any)[key] = (data as any)[key];
                }
            }
        }
    }

    public async deleteBook(id: number): Promise<void> {
        delete this.books[id];
    }

    public async getBookAuthor(bookId: number): Promise<number | undefined> {
        const book = this.books[bookId];
        return book?.authorId;
    }
}
