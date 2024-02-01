import { createPool, Pool, PoolConfig, PoolConnection } from 'mariadb';
import EnvConfig from '../../businessLayer/utils/EnvConfig';
import { CustomError } from '../../businessLayer/model/CustomError';
import { ErrorType } from '../../businessLayer/enum/ErrorType';

class DatabaseConnection {
    private pool: Pool;
    constructor(poolConfig: PoolConfig) {
        this.pool = createPool(poolConfig);
    }
    // TODO later add interfaces for query result, or generic type
    public async runQuery(sqlQuery: string, parameters: any[]): Promise<any> {
        let connection: PoolConnection | undefined;
        let result;
        try {
            connection = await this.pool.getConnection();
            result = await connection.query(sqlQuery, parameters);
        } catch (error) {
            const sqlError = error as Error;
            throw new CustomError(ErrorType.QueryError, sqlError.message, {
                name: sqlError.name,
                query: sqlQuery,
                stack: sqlError.stack
            });
        } finally {
            if (connection) connection.release();
            return result;
        }
    }
}
const config: PoolConfig = {
    host: EnvConfig.DB_HOST,
    user: EnvConfig.DB_USER,
    password: EnvConfig.DB_USER_PASSWORD,
    database: EnvConfig.DB_NAME,
    port: EnvConfig.DB_PORT,
    connectionLimit: 20
}
export const DB = new DatabaseConnection(config);
