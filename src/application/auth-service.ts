import { SessionService } from "@application/session-service";
import { UserRepository } from "@domain/repository/users";
import {
    EmailAddress,
    EmailID,
    User,
    Username,
    Email,
    UserID,
} from "@domain/model/users";
import { HashService } from "@application/hash-service";
import { Password } from "./password";
import { PublicInterface } from "@utils/types";
import { uuidV4 } from "@utils/uuid";

export class UserNotFoundError extends Error {}
export class WrongPasswordError extends Error {}

export class EmailAlreadyRegisteredError extends Error {}
export class UsernameAlreadyRegisteredError extends Error {}

export class SessionNotFoundError extends Error {}

type UserData = {
    id: string;
    username: string;
    email: string;
};

export class AuthServiceImpl {
    private userRepository: UserRepository;
    private sessionService: SessionService;
    private hashService: HashService;

    constructor(
        userRepository: UserRepository,
        sessionService: SessionService,
        hashService: HashService
    ) {
        this.userRepository = userRepository;
        this.sessionService = sessionService;
        this.hashService = hashService;
    }

    async user(token: string): Promise<UserData | null> {
        let session = await this.sessionService.find(token);

        if (session == null) throw new SessionNotFoundError();

        let user = await this.userRepository.find(session.getCurrentUserID());

        if (user == null) throw new UserNotFoundError();

        return {
            id: user.id.value,
            username: user.username.value,
            email: user.email.address.value,
        };
    }

    async signIn(username: string, password: string): Promise<string> {
        let usernameObj = new Username(username);
        let passwordObj = new Password(password);

        let user = await this.userRepository.findByUsername(usernameObj);
        if (user == null) throw new UserNotFoundError();

        let match = await this.hashService.compare(
            passwordObj,
            user.passwordHash
        );

        if (!match) throw new WrongPasswordError();

        let session = await this.sessionService.create(user.id);
        return session.getToken();
    }

    async signUp(
        username: string,
        email: string,
        password: string
    ): Promise<void> {
        let usernameObj = new Username(username);
        let emailAddressObj = new EmailAddress(email);
        let passwordObj = new Password(password);

        let emailAlreadyUsed =
            await this.userRepository.hasUserWithEmailAddress(emailAddressObj);

        if (emailAlreadyUsed) throw new EmailAlreadyRegisteredError();

        let emailObj = new Email({
            id: new EmailID(uuidV4()),
            address: emailAddressObj,
        });

        emailObj.generateCode();

        let usernameAlreadyRegistered =
            await this.userRepository.hasUserWithUsername(usernameObj);

        if (usernameAlreadyRegistered)
            throw new UsernameAlreadyRegisteredError();

        let hash = await this.hashService.hash(passwordObj);

        let user = new User({
            id: new UserID(uuidV4()),
            username: usernameObj,
            email: emailObj,
            passwordHash: hash,
        });

        await this.userRepository.create(user);
        // send validation code!
    }

    async logout(token: string): Promise<void> {
        let session = await this.sessionService.find(token);

        if (session) {
            await this.sessionService.delete(session);
        } else {
            throw new SessionNotFoundError();
        }
    }
}

export type AuthService = PublicInterface<AuthServiceImpl>;
