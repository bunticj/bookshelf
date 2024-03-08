import EnvConfig from "./EnvConfig";
import Winston from "winston";
import ExpressWinston from 'express-winston';
import { Handler } from "express";

class Logger {
    private verboseLogs: string;
    public winstonLogger: Handler;
    constructor(verboseLogs: string) {
        this.verboseLogs = verboseLogs;
        this.winstonLogger = ExpressWinston.logger({
            transports: [new Winston.transports.Console()],
            format: Winston.format.combine(Winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.SSS'
            }), Winston.format.json())
        });
    }

    public error(error: string): void {
        console.error(`${new Date().toISOString()} [ERROR] ${error}`);
    }

    public critical(error: string): void {
        console.error(`${new Date().toISOString()} [CRITICAL] ${error}`);
    }

    public debug(message: string): void {
        console.log(`\n${new Date().toISOString()} [DEBUG] ${message}\n`);
    }

    public verbose(message: string): void {
        if (!this.verboseLogs) return;
        console.log(`${new Date().toISOString()} [VERBOSE] ${message}`);
    }

    public log(message: string): void {
        console.log(`${new Date().toISOString()} [INFO] ${message}`);
    }
}

export const LOGGER = new Logger(EnvConfig.VERBOSE_LOGS);
