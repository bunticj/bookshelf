
import { DB } from "../DatabaseConnection";
export abstract class AbstractQuery<T> {
    protected abstract table: string;

    public abstract createEntity(data: T): Promise<T>;
    public abstract updateEntity(data: Partial<T>): Promise<void>;
    public abstract deleteEntity(data: T): Promise<void>;

    public async getEntity(key: string, value: string | number): Promise<T> {
        const query = `SELECT * FROM ${this.table} WHERE ${key} = ?;`;
        const [result] = await DB.runQuery(query, [value]);
        return result;
    }
}

