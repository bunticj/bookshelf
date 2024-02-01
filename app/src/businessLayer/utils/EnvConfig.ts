import * as dotenv from "dotenv";
dotenv.config();
export default {
    SERVER_PORT: +(process.env.SERVER_PORT)! || 3000,
    SERVER_HOST: process.env.SERVER_HOST || "localhost",
    HTTP_PROTOCOL_TYPE: process.env.HTTP_PROTOCOL_TYPE || 'http',
    HTTPS_KEY_PATH: process.env.HTTPS_KEY_PATH, // If we want to use https, add certificate path  and set protocol in .env file
    HTTPS_CERT_PATH: process.env.HTTPS_CERTIFICATE_PATH,
    VERBOSE_LOGS: process.env.VERBOSE_LOGS || "",
}