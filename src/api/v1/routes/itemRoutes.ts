import express, { Router } from "express";

import type { Item } from "../models/gameModels"
import {
    getEntryById,
    getEntries,
    addEntry,
    updateEntry,
    deleteEntry
} from "../controllers/entryController"

const router: Router = express.Router();

const COLLECTION:string = "Item"

// "/api/v1/items"
router.get("/:id", getEntryById<Item>(COLLECTION));
router.get("/", getEntries<Item>(COLLECTION));
router.post("/", addEntry<Item>(COLLECTION));
router.put("/:id", updateEntry<Item>(COLLECTION));
router.delete("/:id", deleteEntry(COLLECTION));

export default router;