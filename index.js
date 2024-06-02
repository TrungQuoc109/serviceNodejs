import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { routes } from "./routes/index.js";
import { connect, StringCodec } from "nats";
import NATS from "nats";
// -----------------------------------------------
dotenv.config();
const app = express();
const port = 5999;
// -----------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------------------------

app.get("/", async (_, res) => {
    res.send(
        'Hello Express Server!<br/><br/><a href="/v1/api/user/hello-world"> Hello world </a> '
    );
});

(async () => {
    try {
        const nc = await NATS.connect({ servers: "nats://localhost:4222" });
        console.log("Publisher connected to NATS");
        const sub = nc.subscribe("greetings", { queue: "greetings.workers" });
        (async () => {
            for await (const m of sub) {
                console.log(
                    `Received message: ${NATS.StringCodec().decode(m.data)}`
                );
            }
        })();
        setInterval(() => {
            const message = `Hello at ${new Date().toISOString()}`;
            nc.publish("greetings", NATS.StringCodec().encode(message));
            console.log(`Published: ${message}`);
        }, 2000);
    } catch (err) {
        console.log(`Error connecting to NATS: ${err.message}`);
    }
})();
routes(app);
// -----------------------------------------------
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
