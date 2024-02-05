
import { DB } from "../DatabaseConnection";
import { IPaginatedData } from "../../../businessLayer/interface/HelperInterface";

export abstract class AbstractQuery<ModelType> {
    protected abstract table: string;

    public abstract createEntity(data: ModelType): Promise<ModelType>;
    public abstract updateEntityById(data: Partial<ModelType>): Promise<void>;

    public async getEntity(key: string, value: string | number): Promise<ModelType> {
        const query = `SELECT * FROM ${this.table} WHERE ${key} = ?;`;
        const [result] = await DB.runQuery(query, [value]);
        return result;
    }

    public async deleteEntityById(id: number): Promise<void> {
        const query = `DELETE FROM ${this.table} WHERE id = ?;`;
        return await DB.runQuery(query, [id]);
    }

    public async getSingleColumn<ReturnType, ConditionType>(column: string, conditionKey: string, conditionValue: ConditionType): Promise<ReturnType | undefined> {
        const query = `SELECT ${column} FROM ${this.table} WHERE ${conditionKey} = ?;`;
        const [result] = await DB.runQuery(query, [conditionValue]);
        return result;
    }

    public async getDataByValueId(key: string, value: number | string, page: number = 1, limit = 10): Promise<IPaginatedData<ModelType>> {
        const query = `SELECT * FROM ${this.table} WHERE ${key} = ? LIMIT ? OFFSET ?;`;
        const offset = (page - 1) * limit;
        const data = await DB.runQuery<ModelType[]>(query, [value, limit, offset]);
        const totalCountQuery = `SELECT COUNT(*) as total FROM ${this.table} WHERE ${key} = ?;`;
        const totalCountResult = await DB.runQuery(totalCountQuery, [value]);
        const totalCount = parseInt(totalCountResult[0].total);
        const totalPages = Math.ceil(totalCount / limit);
        return { data, page, totalPages };
    }

    public async getAllData( page: number = 1, limit = 10): Promise<IPaginatedData<ModelType>> {
        const query = `SELECT * FROM ${this.table} LIMIT ? OFFSET ?;`;
        const offset = (page - 1) * limit;
        const data = await DB.runQuery<ModelType[]>(query, [limit, offset]);
        const totalCountQuery = `SELECT COUNT(*) as total FROM ${this.table};`;
        const totalCountResult = await DB.runQuery(totalCountQuery, []);
        const totalCount = parseInt(totalCountResult[0].total);
        const totalPages = Math.ceil(totalCount / limit);
        return { data, page, totalPages };
    }


    // TODO REMOVE LATER, JUST FOR DEBUG
    public async getAllEntities(tableName: string): Promise<any> {
        const query = `SELECT * FROM ${tableName}`;
        const results = await DB.runQuery(query, []);
        return results;
    }
}

