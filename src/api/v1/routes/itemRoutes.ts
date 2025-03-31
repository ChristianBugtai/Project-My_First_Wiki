import express, { Router } from "express";

import * as itemController from "../controllers/itemController"

const router: Router = express.Router();

// "/api/v1/items"
router.get("/:id", itemController.getDocumentById);
router.get("/", itemController.getDocuments);
router.post("/", itemController.addDocument);
router.put("/:id", itemController.updateDocument);
router.delete("/:id", itemController.deleteDocument);

export default router;