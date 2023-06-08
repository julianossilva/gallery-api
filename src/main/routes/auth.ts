import { AuthService } from "@application/auth-service";
import { assertEmail, assertPassword, assertUsername } from "@utils/assertions";
import { Router, Request, Response } from "express";

const routes = (authService: AuthService) => {
    let r = Router();

    r.post("/signup", async (req: Request, res: Response) => {
        let username: string;
        let email: string;
        let password: string;

        try {
            username = assertUsername(req.body.username);
            email = assertEmail(req.body.email);
            password = assertPassword(req.body.password);
        } catch (e) {
            res.status(400).send({
                message: "invalid input",
            });
            return;
        }

        try {
            return await authService.signUp(username, email, password);
        } catch (e) {
            res.status(500).send();
        }
    });

    r.post("/signin", async (req: Request, res: Response) => {
        let username: string;
        let password: string;

        try {
            username = assertUsername(req.body.username);
            password = assertPassword(req.body.password);
        } catch (e) {
            res.status(400).send({
                message: "invalid input",
            });
            return;
        }

        try {
            return await authService.signIn(username, password);
        } catch (e) {
            res.status(500).send();
        }
    });

    r.post("/logout", async (req: Request, res: Response) => {
        let token: string;

        try {
            token = req.header("Authorization") ?? "";
        } catch (e) {
            res.status(400).send();
            return;
        }

        try {
            await authService.logout(token);
            res.status(200).send();
        } catch (e) {
            res.status(500).send();
        }
    });
    return r;
};

export default routes;
