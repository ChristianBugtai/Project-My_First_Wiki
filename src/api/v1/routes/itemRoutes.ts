import express, { Router } from "express";

import type { Item } from "../models/gameModels"
import authenticate  from "../middleware/authentication";
import isAuthorized from "../middleware/authorization";
import {
    getEntryById,
    getEntries,
    addEntry,
    updateEntry,
    deleteEntry
} from "../controllers/entryController"
import { updatePendingEntry } from "../controllers/pendingController";


const router: Router = express.Router();

const COLLECTION:string = "Item"

// "/api/v1/items"
/**
 * @route GET /:id
 * @description Get items by id
 * 
 * @openapi
 * /app/v1/items/{id}:
 *   get:
 *     summary: Get items by Id.
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the item to retrieve.
 *     responses:
 *       200:
 *         description: The item if the matching id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.get(
    "/:id",
    getEntryById<Item>(COLLECTION)
);

/**
 * @route GET /
 * @description Get all items
 * 
 * @openapi
 * /app/v1/items:
 *   get:
 *     summary: Get all items
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get(
    "/", 
    getEntries<Item>(COLLECTION)
);

/**
 * @route POST /
 * @description Create a new item
 * 
 * @openapi
 * /app/v1/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid input
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    addEntry<Item>(COLLECTION)
);

/**
 * @route PUT /:id
 * @description Update an item by ID
 * 
 * @openapi
 * /app/v1/items/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.put(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    updateEntry<Item>(COLLECTION)
);

/**
 * @route DELETE /:id
 * @description Delete an item by ID
 * 
 * @openapi
 * /app/v1/items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */
router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    deleteEntry(COLLECTION)
);

router.post(
    "/pending/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "contributor" ] }),
    updatePendingEntry<Item>("itemPending")
);
export default router;