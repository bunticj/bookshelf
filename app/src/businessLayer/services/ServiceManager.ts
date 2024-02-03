import { BookRepository } from "../../dataAccessLayer/repository/BookRepository";
import { UserRepository } from "../../dataAccessLayer/repository/UserRepository";
import { UserTokenRepository } from "../../dataAccessLayer/repository/UserTokenRepository";
import { AuthenticationService } from "./AuthenticationService";
import { BookService } from "./BookService";
import { UserService } from "./UserService";
import { UserTokenService } from "./UserTokenService";

class ServiceManager {
    public userService: UserService;
    public bookService: BookService;
    public userTokenService: UserTokenService;
    public authenticationService: AuthenticationService;
    constructor() {
        this.userService = new UserService(new UserRepository());
        this.bookService = new BookService(new BookRepository());
        this.userTokenService = new UserTokenService(new UserTokenRepository());
        this.authenticationService = new AuthenticationService();
    }
}

export const serviceManager = new ServiceManager(); 