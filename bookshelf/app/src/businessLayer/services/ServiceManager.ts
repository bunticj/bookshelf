import { BookRepository } from "../../dataAccessLayer/repository/BookRepository";
import { UserRepository } from "../../dataAccessLayer/repository/UserRepository";
import { UserTokenRepository } from "../../dataAccessLayer/repository/UserTokenRepository";
import { LOGGER } from "../utils/Logger";
import { AuthenticationService } from "./AuthenticationService";
import { BookService } from "./BookService";
import { UserService } from "./UserService";
import { UserTokenService } from "./UserTokenService";

export class ServiceManager {
    public userService: UserService;
    public bookService: BookService;
    public userTokenService: UserTokenService;
    public authenticationService: AuthenticationService;
    constructor(userService: UserService, bookService: BookService,
        userTokenService: UserTokenService, authenticationService: AuthenticationService) {
        this.userService = userService;
        this.bookService = bookService;
        this.userTokenService = userTokenService;
        this.authenticationService = authenticationService;
    }
}

const userService = new UserService(new UserRepository());
const bookService = new BookService(new BookRepository());
const authenticationService = new AuthenticationService();
const userTokenService = new UserTokenService(new UserTokenRepository());

export const serviceManager = new ServiceManager(userService, bookService, userTokenService, authenticationService);
(async () => {
    await serviceManager.userService.initAdmin();
    await serviceManager.userTokenService.clearOldTokens();
})().catch(error => LOGGER.critical(error));