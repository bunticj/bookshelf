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

    /**
     * Executes a SQL query with parameters and returns the result.
     * @template T The type of the result.
     * @param {string} sqlQuery - The SQL query to execute.
     * @param {any[]} parameters - The parameters for the SQL query.
     * @returns {Promise<T>} A promise that resolves with the result of the SQL query.
     * @throws {CustomError} Throws a QueryError if the query execution fails.
     */
    public async runQuery<T = any>(sqlQuery: string, parameters: any[]): Promise<T> {
        let connection: PoolConnection | undefined;
        try {
            connection = await this.pool.getConnection();
            const result = await connection.query(sqlQuery, parameters);
            if (connection) await connection.release();
            return result;
        } catch (error) {
            if (connection) await connection.release();
            throw new CustomError(ErrorType.QueryError, (error as Error).name, { message: (error as Error).message });
        }
    }
}

const config: PoolConfig = {
    host: EnvConfig.DB_HOST || "localhost",
    user: EnvConfig.DB_USER,
    password: EnvConfig.DB_USER_PASSWORD,
    database: EnvConfig.DB_NAME,
    port: EnvConfig.DB_PORT,
    connectionLimit: Constants.databaseConnectionLimit,
    connectTimeout: 20000
};

export const DB = new DatabaseConnection(config);
