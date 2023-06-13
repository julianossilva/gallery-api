import multer from "multer";
import { Router, Request, Response } from "express";
import { UploadServiceFactory } from "@main/factory/services/upload-service-factory";

const routes = (uploadServiceFactory: UploadServiceFactory): Router => {
    let r = Router();
    let uploads = multer({ dest: ".uploads/" });

    r.post(
        "/upload",
        uploads.single("wallpaper"),
        async (req: Request, res: Response) => {
            let token = req.header("Authorization") ?? "";

            let file = req.file;
            if (file == undefined) {
                res.status(400).send();
                return;
            }

            if (file.mimetype != "image/png") {
                res.status(400).send();
                return;
            }

            try {
                let name = await uploadServiceFactory
                    .create()
                    .upload(token, file.path);

                res.status(200).send({
                    name: name,
                });
            } catch (err) {
                return res.status(500).send();
            }
        }
    );

    return r;
};

export default routes;
