import * as dotenv from "dotenv";
dotenv.config();
export default {
    SERVER_PORT: +(process.env.SERVER_PORT)!,
    SERVER_HOST: process.env.SERVER_HOST!,
    HTTP_PROTOCOL_TYPE: process.env.HTTP_PROTOCOL_TYPE!,
    HTTPS_KEY_PATH: process.env.HTTPS_KEY_PATH, // If we want to use https, add certificate path  and set protocol in .env file
    HTTPS_CERT_PATH: process.env.HTTPS_CERTIFICATE_PATH,
    VERBOSE_LOGS: process.env.VERBOSE_LOGS || "",
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: +(process.env.DB_PORT)!,
    DB_NAME: process.env.DB_NAME!,
    DB_USER: process.env.DB_USER!,
    DB_USER_PASSWORD: process.env.DB_USER_PW!,
    JWT_SECRET: process.env.JWT_SECRET!,
    DEFAULT_ADMIN_EMAIL: process.env.DEFAULT_ADMIN_EMAIL!,
    DEFAULT_ADMIN_PASS: process.env.DEFAULT_ADMIN_PASS!
};