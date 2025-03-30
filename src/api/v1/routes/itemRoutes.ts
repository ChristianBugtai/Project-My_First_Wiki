import express, { Router } from "express";

import * as itemController from "../controllers/itemController"

const router: Router = express.Router();

// "/api/v1/items"
router.get("/", itemController.getItems);
router.get("/:id", itemController.getItem);
router.post("/", itemController.addItem);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

export default router;