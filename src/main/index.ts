import { createApp } from "./app";

const PORT = process.env.APP_PORT;

async function main() {
    let app = createApp();

    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    });
}

main();
