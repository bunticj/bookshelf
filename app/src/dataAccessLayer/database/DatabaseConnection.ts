import { createPool, Pool, PoolConfig, PoolConnection } from 'mariadb';
import { ErrorType } from '../../businessLayer/enum/ErrorType';
import { CustomError } from '../../businessLayer/model/CustomError';
import EnvConfig from '../../businessLayer/utils/EnvConfig';
import { Constants } from '../../businessLayer/utils/Constants';
class DatabaseConnection {
    private pool: Pool;
    constructor(poolConfig: PoolConfig) {
        this.pool = createPool(poolConfig);
    }

    public async runQuery<T = any>(sqlQuery: string, parameters: any[]): Promise<T> {
        let connection: PoolConnection | undefined;
        try {
            connection = await this.pool.getConnection();
            const result = await connection.query(sqlQuery, parameters);
            if (connection) connection.release();
            return result;
        } catch (error) {
            if (connection) connection.release();
            throw new CustomError(ErrorType.QueryError, (error as Error).name, { message: (error as Error).message });
        }
    }
}

const config: PoolConfig = {
    host: EnvConfig.DB_HOST,
    user: EnvConfig.DB_USER,
    password: EnvConfig.DB_USER_PASSWORD,
    database: EnvConfig.DB_NAME,
    port: EnvConfig.DB_PORT,
    connectionLimit: Constants.databaseConnectionLimit
}
export const DB = new DatabaseConnection(config);
