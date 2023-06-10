import { createApp } from "@main/app";
import { cleanDatabase } from "@main/clean-database";
import request from "supertest";
import express from "express";

let app: express.Application;
let shutdownFunc: () => Promise<void>;

beforeEach(async () => {
    await cleanDatabase();
    let appAndShutdown = await createApp();

    app = appAndShutdown[0];
    shutdownFunc = appAndShutdown[1];
});

afterEach(async () => {
    await shutdownFunc();
});

test("should register a new user", async () => {
    let res = await request(app).post("/signup").send({
        username: "ana",
        email: "ana@email.com",
        password: "12345678",
    });

    expect(res.status).toBe(201);

    res = await request(app).post("/signin").send({
        username: "ana",
        password: "12345678",
    });

    expect(res.status).toBe(200);

    res = await request(app)
        .get("/profile")
        .set({ Authorization: res.body.token })
        .send();
    expect(res.status).toBe(200);
    expect(res.body.username).toBe("ana");
    expect(res.body.email).toBe("ana@email.com")
}, 30000);
