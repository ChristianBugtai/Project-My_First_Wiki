import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import itemRoutes from "./api/v1/routes/itemRoutes";
import locationRoutes from "./api/v1/routes/locationRoutes";
import monsterRoutes from "./api/v1/routes/monsterRoutes";
import treasureRoutes from "./api/v1/routes/treasureRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes"
import errorHandler from "./api/v1/middleware/errorHandling";

const app: Express = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/monsters", monsterRoutes);
app.use("/api/v1/treasures", treasureRoutes);
app.use("/api/v1/admin", adminRoutes)

//error handling
app.use(errorHandler)

export default app;