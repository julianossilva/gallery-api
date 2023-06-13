import { createApp } from "./app";

const PORT = process.env.APP_PORT;

async function main() {
    let [app, _] = await createApp();

    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    });
}

main();
