import { BookRepository } from "../../dataAccessLayer/repository/BookRepository";
import { UserRepository } from "../../dataAccessLayer/repository/UserRepository";
import { BookService } from "./BookService";
import { UserService } from "./UserService";

class ServiceManager {
    public userService: UserService;
    public bookService: BookService;
    constructor() {
        this.userService = new UserService(new UserRepository());
        this.bookService = new BookService(new BookRepository());
    }
}

export const serviceManager = new ServiceManager(); 