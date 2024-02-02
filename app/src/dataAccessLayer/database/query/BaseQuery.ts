
import { DB } from "../DatabaseConnection";
export abstract class BaseQuery {
    protected abstract table: string;

    public abstract createEntity<T>(data: T): Promise<T>;
    public abstract updateEntity<T>(data: T): Promise<T>;
    public abstract deleteEntity<T>(data: T): Promise<void>;

    public async getEntity<T>(key: string, value: string | number): Promise<T> {
        const query = `SELECT * FROM ${this.table} WHERE ${key} = ?;`;
        const [result] = await DB.runQuery(query, [value]);
        return result;
    }
}

