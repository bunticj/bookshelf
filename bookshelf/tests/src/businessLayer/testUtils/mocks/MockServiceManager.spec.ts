import { AuthenticationService } from "../../../../../app/src/businessLayer/services/AuthenticationService";
import { BookService } from "../../../../../app/src/businessLayer/services/BookService";
import { ServiceManager, serviceManager } from "../../../../../app/src/businessLayer/services/ServiceManager";
import { UserService } from "../../../../../app/src/businessLayer/services/UserService";
import { UserTokenService } from "../../../../../app/src/businessLayer/services/UserTokenService";
import { MockBookRepository } from "./MockBookRepository.spec";
import { MockUserRepository } from "./MockUserRepository.spec";
import { MockUserTokenRepository } from "./MockUserTokenRepository.spec";


export const restartRepos = () => {
    const mockManager = new ServiceManager(new UserService(new MockUserRepository()), new BookService(new MockBookRepository()),
        new UserTokenService(new MockUserTokenRepository()), new AuthenticationService());
    Object.assign(serviceManager, mockManager);
}
