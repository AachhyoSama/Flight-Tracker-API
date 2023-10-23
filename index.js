import https from "https";
import fs from "fs";
import express from "express";
import { tracker } from "./routes/tracker.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/flightTrackerAPI/v1/", tracker);

https
    .createServer(
        {
            key: fs.readFileSync("./key.pem"),
            cert: fs.readFileSync("./cert.pem"),
        },
        app
    )
    .listen(port, () => {
        console.log(`UpStreamAPI app server is running at port ${port}`);
    });
