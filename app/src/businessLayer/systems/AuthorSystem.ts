import { StatusType } from "../enum/StatusType";
import { bookService } from "../services/BookService";
import { userService } from "../services/UserService";

class AuthorSystem {
    public async changeActiveStatus(userId: number, statusType: StatusType): Promise<void> {
        await userService.updateUser({ id: userId, status_type: statusType });
        await bookService.updateBook({ author_id: userId, status_type: statusType });
    }
}
export const authorSystem = new AuthorSystem(); 