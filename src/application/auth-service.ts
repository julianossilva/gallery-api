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
import { DateTime } from "@utils/datetime";
import { PublicInterface } from "@utils/types";
import { uuidV4 } from "@utils/uuid";

export class UserNotFoundError extends Error {}
export class WrongPasswordError extends Error {}

export class EmailAlreadyRegisteredError extends Error {}
export class UsernameAlreadyRegisteredError extends Error {}

export class SessionNotFoundError extends Error {}

export class AuthService {
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
        let now = new DateTime();

        let emailAlreadyUsed =
            await this.userRepository.hasUserWithEmailAddress(emailAddressObj);
        if (emailAlreadyUsed) throw new EmailAlreadyRegisteredError();
        let emailObj = new Email({
            id: new EmailID(uuidV4()),
            address: emailAddressObj,
            token: null,
            validated: false,
            created: now.clone(),
            deleted: null,
        });

        let usernameAlreadyRegistered =
            await this.userRepository.hasUserWithUsername(usernameObj);
        if (usernameAlreadyRegistered)
            throw new UsernameAlreadyRegisteredError();

        let hash = await this.hashService.hash(passwordObj);
        let user = new User({
            id: new UserID(uuidV4()),
            username: usernameObj,
            email: emailObj,
            newEmail: null,
            passwordHash: hash,
            created: now.clone(),
            deleted: null,
        });

        await this.userRepository.create(user);
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

export type IAuthService = PublicInterface<AuthService>;
