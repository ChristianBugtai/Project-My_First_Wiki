import express, { Router } from "express";

import type { Location } from "../models/gameModels"
import {
    getEntryById,
    getEntries,
    addEntry,
    updateEntry,
    deleteEntry
} from "../controllers/entryController"

const router: Router = express.Router();

const COLLECTION:string = "Location"

// "/api/v1/locations"
router.get("/:id", getEntryById<Location>(COLLECTION));
router.get("/", getEntries<Location>(COLLECTION));
router.post("/", addEntry<Location>(COLLECTION));
router.put("/:id", updateEntry<Location>(COLLECTION));
router.delete("/:id", deleteEntry(COLLECTION));

export default router;