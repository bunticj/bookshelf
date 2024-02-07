import { Book } from "../../../businessLayer/model/Book";
import { Constants } from "../../../businessLayer/utils/Constants";
import { DB } from "../DatabaseConnection";
import { AbstractQuery } from "./AbstractQuery";

export class BookQuery extends AbstractQuery<Book> {
    protected table: string;
    constructor() {
        super();
        this.table = Constants.bookTableName;

    }
    public async createEntity(data: Book): Promise<Book> {
        const { authorId, title, publisher, status } = data;
        const query = `INSERT into ${this.table} (authorId, title, publisher,status) VALUES (?, ?, ?, ?);`;
        const result = await DB.runQuery(query, [authorId, title, publisher, status]);
        const id = parseInt(result.insertId);
        data.id = id;
        return data;
    }

    public async updateEntityById(data: Partial<Book>): Promise<void> {
        const { title, publisher, id, status } = data;
        const query = `UPDATE ${this.table} SET title = IFNULL(?, title), publisher = IFNULL(?, publisher),status = IFNULL(?, status)
        WHERE id = ?`;
        return await DB.runQuery(query, [title, publisher, status, id]);
    }

    public async updateEntitiesByAuthorId(data: Partial<Book>): Promise<void> {
        const { title, publisher, status, authorId } = data;
        const query = `UPDATE ${this.table} SET title = IFNULL(?, title), publisher = IFNULL(?, publisher),status = IFNULL(?, status)
        WHERE authorId = ?`;
        return await DB.runQuery(query, [title, publisher, status, authorId!]);
    }
}

