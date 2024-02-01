
import { DB } from "../DatabaseConnection";
export abstract class BaseQuery {
    protected abstract table: string;

    public async createEntity<T>(data: T): Promise<void> {
        // overriden in derived class
    } 

    public async updateEntity<T>(data: T): Promise<any> {
        // overriden in derived class
    }

    public async deleteEntity(key: string, value: string | number): Promise<any> {
        const query = `DELETE FROM ${this.table} WHERE ${key} = ?;`;
        return await DB.runQuery(query, [value]);
    }
    
    public async getEntity<T>(key: string, value: string | number): Promise<T> {
        const query = `SELECT * FROM ${this.table} WHERE ${key} = ?;`;
        const [result] = await DB.runQuery(query, [value]);
        return result;
    }
}
