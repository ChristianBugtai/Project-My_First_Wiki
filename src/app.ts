import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import itemRoutes from "./api/v1/routes/itemRoutes";
import locationRoutes from "./api/v1/routes/locationRoutes";
import monsterRoutes from "./api/v1/routes/monsterRoutes";
import treasureRoutes from "./api/v1/routes/treasureRoutes";

const app: Express = express();
app.use(express.json());

app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/monsters", monsterRoutes);
app.use("/api/v1/treasures", treasureRoutes);

export default app;