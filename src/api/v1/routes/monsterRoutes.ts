import express, { Router } from "express";

import type { Monster } from "../models/gameModels"
import {
    getEntryById,
    getEntries,
    addEntry,
    updateEntry,
    deleteEntry
} from "../controllers/entryController"

const router: Router = express.Router();

const COLLECTION:string = "Monster"

// "/api/v1/items"
router.get("/:id", getEntryById<Monster>(COLLECTION));
router.get("/", getEntries<Monster>(COLLECTION));
router.post("/", addEntry<Monster>(COLLECTION));
router.put("/:id", updateEntry<Monster>(COLLECTION));
router.delete("/:id", deleteEntry(COLLECTION));

export default router;