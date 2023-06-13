import { createApp } from "@main/app";
import { cleanDatabase } from "@main/clean-database";
import { cleanStorage } from "@main/clean-storage";
import { Application } from "express";
import request from "supertest";
import 'dotenv/config'

let app: Application;
let shutdown: () => Promise<void>;

const MINIO_HOST = process.env.MINIO_HOST ?? ""
const MINIO_BUCKET = process.env.MINIO_BUCKET ?? ""

beforeEach(async () => {
    await cleanDatabase();
    await cleanStorage();
    let appAndShutdown = await createApp();

    app = appAndShutdown[0];
    shutdown = appAndShutdown[1];
});

afterEach(async () => {
    await shutdown();
});

test("should upload a file", async () => {
    let res = await request(app).post("/signup").send({
        username: "ana",
        email: "ana@email.com",
        password: "12345678",
    });

    res = await request(app).post("/signin").send({
        username: "ana",
        password: "12345678",
    });

    res = await request(app)
        .post("/upload")
        .set("Authorization", res.body.token)
        .attach("wallpaper", "assets/solid-color-black.png");

    let resStorage = await fetch(`http://${MINIO_HOST}:9000/${MINIO_BUCKET}/${res.body.name}`);
    expect(resStorage.status).toBe(200);
}, 20000);
