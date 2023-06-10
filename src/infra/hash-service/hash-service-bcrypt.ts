import { HashService } from "@application/hash-service";
import { Password } from "@application/password";
import { PasswordHash } from "@domain/model/users";
import bcrypt from "bcrypt";

export class HashServiceBcrypt implements HashService {
    async hash(password: Password): Promise<PasswordHash> {
        let hash: string = await bcrypt.hash(password.value, 14);

        return new PasswordHash(hash);
    }
    async compare(
        password: Password,
        passwordHash: PasswordHash
    ): Promise<boolean> {
        return await bcrypt.compare(password.value, passwordHash.value);
    }
}
