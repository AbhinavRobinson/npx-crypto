const express = require("express");
const cors = require("cors");
const db = require("./db/db.js");
const Message = require("./models/message.js");

const username = process.argv[2].split('=')[1]
console.log(`Hello, ${username}`)
const userSchema = require('./userSchema.js')

// If you want to test this, message me, for now, only my IP can call this function!
const connectionString = 'mongodb+srv://crypto:Abhi2310@cluster0.0bkns.mongodb.net/chat-demo?retryWrites=true&w=majority'

const port = 8463;
const dbUrl = connectionString;
const frontUrl = "http://localhost:3000";


async function main() {
    try {
        await db.connect(dbUrl);
    } catch (except) {
        console.log("Error during connection to the database:");
        console.error(except);
        process.exit(1);
    }

    const app = express();
    app.use(cors({
        origin: frontUrl,
        optionsSuccessStatus: 200,
        credentials: true,
    }));
    const server = app.listen(port, () => console.log(`Server running on port ${port}.`));

    const socket = require("socket.io")(server);
    socket.on("connection", async (client) => {
        console.log("client connected...");

        client.on("message", async (msg) => {
            let message = await Message.Schema.statics.create(msg);
            socket.emit("message", message);
        });

        let latest = await Message.Schema.statics.latest(10);
        client.emit("latest", latest);
    });
}

main();