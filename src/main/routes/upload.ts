import multer from "multer";
import { Router, Request, Response } from "express";

const routes = (): Router => {
    let r = Router()
    let uploads = multer({ dest: ".uploads/" });

    r.post(
        "/upload",
        uploads.single("wallpaper"),
        (req: Request, res: Response) => {
            
            res.status(200).send();
        }
    );

    return r;
};

export default routes;
