import express, { Router } from "express";

import type { Treasure } from "../models/gameModels"
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

const COLLECTION:string = "Treasure"

// "/api/v1/treasures"
/**
 * @route GET /:id
 * @description Get a treasure by id
 * 
 * @openapi
 * /app/v1/treasures/{id}:
 *   get:
 *     summary: Get a treasure by ID
 *     tags: [Treasure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the treasure to retrieve
 *     responses:
 *       200:
 *         description: The treasure matching the given ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treasure'
 *       404:
 *         description: Treasure not found
 */
router.get(
    "/:id", 
    getEntryById<Treasure>(COLLECTION)
);

/**
 * @route GET /
 * @description Get all treasures
 * 
 * @openapi
 * /app/v1/treasures:
 *   get:
 *     summary: Get all treasures
 *     tags: [Treasure]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all treasures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Treasure'
 */
router.get(
    "/", 
    getEntries<Treasure>(COLLECTION)
);

/**
 * @route POST /
 * @description Create a new treasure
 * 
 * @openapi
 * /app/v1/treasures:
 *   post:
 *     summary: Create a new treasure
 *     tags: [Treasure]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treasure'
 *     responses:
 *       201:
 *         description: Treasure successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treasure'
 *       400:
 *         description: Invalid input
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    addEntry<Treasure>(COLLECTION)
);

/**
 * @route PUT /:id
 * @description Update a treasure by ID
 * 
 * @openapi
 * /app/v1/treasures/{id}:
 *   put:
 *     summary: Update a treasure by ID
 *     tags: [Treasure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the treasure to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treasure'
 *     responses:
 *       200:
 *         description: Treasure updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treasure'
 *       404:
 *         description: Treasure not found
 */
router.put(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    updateEntry<Treasure>(COLLECTION)
);

/**
 * @route DELETE /:id
 * @description Delete a treasure by ID
 * 
 * @openapi
 * /app/v1/treasures/{id}:
 *   delete:
 *     summary: Delete a treasure by ID
 *     tags: [Treasure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the treasure to delete
 *     responses:
 *       200:
 *         description: Treasure deleted successfully
 *       404:
 *         description: Treasure not found
 */
router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    deleteEntry(COLLECTION)
);

router.put(
    "/pending/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "contributor" ] }),
    updatePendingEntry<Treasure>("treasurePending")
);

export default router;