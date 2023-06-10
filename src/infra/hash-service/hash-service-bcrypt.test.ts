import { HashServiceBcrypt } from "./hash-service-bcrypt";
import { Password } from "@application/password";

test("should create compare passwords correctly", async () => {
    let hashService = new HashServiceBcrypt();

    let password1 = new Password("12345678");
    let password2 = new Password("qwerty123");

    let hash1 = await hashService.hash(password1);
    let hash2 = await hashService.hash(password2);

    expect(await hashService.compare(password1, hash1)).toBe(true);
    expect(await hashService.compare(password2, hash2)).toBe(true);

    expect(await hashService.compare(password1, hash2)).toBe(false);
    expect(await hashService.compare(password2, hash1)).toBe(false);
}, 60000);
