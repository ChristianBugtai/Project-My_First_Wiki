import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import itemRoutes from "./api/v1/routes/itemRoutes";

const app: Express = express();

app.get("/", (req, res) => {
    res.send("Hello, World!")
});

app.get("/api/v1/items", itemRoutes);

export default app;