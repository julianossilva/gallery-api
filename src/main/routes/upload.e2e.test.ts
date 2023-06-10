import { createApp } from "@main/app";
import { cleanDatabase } from "@main/clean-database";
import { Application } from "express";
import request from 'supertest'

let app: Application;
let shutdown: () => Promise<void>



beforeEach(async () => {
    await cleanDatabase()

    let appAndShutdown = await createApp()

    app = appAndShutdown[0]
    shutdown = appAndShutdown[1]
})



afterEach(async () => {
    await shutdown()
})

test("should upload a file", async () => {

    let res = await request(app)
        .post("/upload")
        .attach("wallpaper", "assets/solid-color-black.png")
        
})