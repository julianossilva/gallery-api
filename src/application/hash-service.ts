import { PasswordHash } from "@domain/model/users";
import { Password } from "./password";

export interface HashService {
    hash(password: Password): Promise<PasswordHash>;
    compare(password: Password, passwordHash: PasswordHash): Promise<boolean>;
}
