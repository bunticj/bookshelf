import { Book } from "../../../businessLayer/model/Book";
import { Constants } from "../../../businessLayer/utils/Constants";
import { DB } from "../DatabaseConnection";
import { BaseQuery } from "./BaseQuery";

export class BookQuery extends BaseQuery {
    protected table: string;
    constructor() {
        super();
        this.table = Constants.bookTableName;

    }
    public async createEntity<T>(data: T): Promise<T> {
        const { author_id, title, publisher, status_type } = data as Book;
        let query = `INSERT into ${this.table} (author_id, title, publisher,status_type) VALUES (?, ?, ?, ?);`;
        const result = await DB.runQuery(query, [author_id, title, publisher, status_type]);
        const id = parseInt(result.insertId);
        (data as any)["id"] = id;
        return data;
    }

    public async updateEntity<T>(data: T): Promise<T> {
        const { title, publisher, id, status_type } = data as Partial<Book>;
        let query = `UPDATE ${this.table} SET title = IFNULL(?, title), publisher = IFNULL(?, publisher),status_type = IFNULL(?, status_type)
        WHERE id = ?`;
        return await DB.runQuery(query, [title, publisher, status_type, id]);
    }

    public async deleteEntity<T>(data: T): Promise<void> {
        const { id, author_id } = data as Partial<Book>;
        const query = `DELETE FROM ${this.table} WHERE id = ? AND author_id = ?;`;
        return await DB.runQuery(query, [id, author_id]);
    }
}
