
import http from "http";
import https from "https";
import cors from "cors";
import express from "express";
import fs from "fs"
import EnvConfig from "./businessLayer/utils/EnvConfig";
import { LOGGER } from "./businessLayer/utils/Logger";

const expressApp: express.Application = express();

expressApp.use(cors({ origin: "*" }));
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());
expressApp.use(LOGGER.winstonLogger);

expressApp.get('/test', (req,res)=> {res.send({message:"test"})});
let server: http.Server | https.Server;

// Add certficates if we want to create a secure server
if (EnvConfig.HTTP_PROTOCOL_TYPE === 'https') {
    const key = fs.readFileSync(`${EnvConfig.HTTPS_KEY_PATH}`);
    const cert = fs.readFileSync(`${EnvConfig.HTTPS_CERT_PATH}`);
    server = https.createServer({ key, cert }, expressApp);
}
else server = http.createServer(expressApp);

server.listen(EnvConfig.SERVER_PORT, () => {
    LOGGER.log(`Server listening at ${EnvConfig.HTTP_PROTOCOL_TYPE}://${EnvConfig.SERVER_HOST}:${EnvConfig.SERVER_PORT}`);
});
