import { HashService } from "@application/hash-service";
import { HashServiceBcrypt } from "@infra/hash-service/hash-service-bcrypt";

export class HashServiceFactory {
    create(): HashService {
        return new HashServiceBcrypt();
    }
}
