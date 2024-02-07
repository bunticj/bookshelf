import { AuthenticationService } from "../../../../../app/src/businessLayer/services/AuthenticationService";
import { BookService } from "../../../../../app/src/businessLayer/services/BookService";
import { ServiceManager, serviceManager } from "../../../../../app/src/businessLayer/services/ServiceManager";
import { UserService } from "../../../../../app/src/businessLayer/services/UserService";
import { UserTokenService } from "../../../../../app/src/businessLayer/services/UserTokenService";
import { UserTokenRepository } from "../../../../../app/src/dataAccessLayer/repository/UserTokenRepository";
import { MockBookRepository } from "./MockBookRepository.spec";
import { MockUserRepository } from "./MockUserRepository.spec";


export const restartRepos = () => {
    const mockManager = new ServiceManager(new UserService(new MockUserRepository()), new BookService(new MockBookRepository()),
        new UserTokenService(new UserTokenRepository()), new AuthenticationService());
    Object.assign(serviceManager, mockManager);
}
