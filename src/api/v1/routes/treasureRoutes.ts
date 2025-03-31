import express, { Router } from "express";

import type { Treasure } from "../models/gameModels"
import {
    getEntryById,
    getEntries,
    addEntry,
    updateEntry,
    deleteEntry
} from "../controllers/entryController"

const router: Router = express.Router();

const COLLECTION:string = "Treasure"

// "/api/v1/treasures"
router.get("/:id", getEntryById<Treasure>(COLLECTION));
router.get("/", getEntries<Treasure>(COLLECTION));
router.post("/", addEntry<Treasure>(COLLECTION));
router.put("/:id", updateEntry<Treasure>(COLLECTION));
router.delete("/:id", deleteEntry(COLLECTION));

export default router;