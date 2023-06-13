import { AuthServiceImpl, AuthService } from "@application/auth-service";
import { UserRepositoryFactory } from "../repository/user-repository-factory";
import { HashServiceFactory } from "./hash-service-factory";
import { SessionServiceFactory } from "./session-service-factory";
export class AuthServiceFactory {
    private userRepositoryFactory: UserRepositoryFactory;
    private sessionServiceFactory: SessionServiceFactory;
    private hashServiceFactory: HashServiceFactory;

    constructor(
        userRepositoryFactory: UserRepositoryFactory,
        sessionServiceFactory: SessionServiceFactory,
        hashServiceFactory: HashServiceFactory
    ) {
        this.userRepositoryFactory = userRepositoryFactory;
        this.sessionServiceFactory = sessionServiceFactory;
        this.hashServiceFactory = hashServiceFactory;
    }

    create(): AuthService {
        return new AuthServiceImpl(
            this.userRepositoryFactory.create(),
            this.sessionServiceFactory.create(),
            this.hashServiceFactory.create()
        );
    }
}
