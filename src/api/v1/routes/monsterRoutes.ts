import express, { Router } from "express";

import type { Monster } from "../models/gameModels"
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

const COLLECTION:string = "Monster"

// "/api/v1/monsters"
/**
 * @route GET /:id
 * @description Get a monster by id
 * 
 * @openapi
 * /app/v1/monsters/{id}:
 *   get:
 *     summary: Get a monster by ID
 *     tags: [Monster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the monster to retrieve
 *     responses:
 *       200:
 *         description: The monster matching the given ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Monster'
 *       404:
 *         description: Monster not found
 */
router.get(
    "/:id", 
    getEntryById<Monster>(COLLECTION)
);

/**
 * @route GET /
 * @description Get all monsters
 * 
 * @openapi
 * /app/v1/monsters:
 *   get:
 *     summary: Get all monsters
 *     tags: [Monster]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all monsters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Monster'
 */
router.get(
    "/", 
    getEntries<Monster>(COLLECTION)
);

/**
 * @route POST /
 * @description Create a new monster
 * 
 * @openapi
 * /app/v1/monsters:
 *   post:
 *     summary: Create a new monster
 *     tags: [Monster]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Monster'
 *     responses:
 *       201:
 *         description: Monster successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Monster'
 *       400:
 *         description: Invalid input
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    addEntry<Monster>(COLLECTION)
);

/**
 * @route PUT /:id
 * @description Update a monster by ID
 * 
 * @openapi
 * /app/v1/monsters/{id}:
 *   put:
 *     summary: Update a monster by ID
 *     tags: [Monster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the monster to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Monster'
 *     responses:
 *       200:
 *         description: Monster updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Monster'
 *       404:
 *         description: Monster not found
 */
router.put(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    updateEntry<Monster>(COLLECTION)
);

/**
 * @route DELETE /:id
 * @description Delete a monster by ID
 * 
 * @openapi
 * /app/v1/monsters/{id}:
 *   delete:
 *     summary: Delete a monster by ID
 *     tags: [Monster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the monster to delete
 *     responses:
 *       200:
 *         description: Monster deleted successfully
 *       404:
 *         description: Monster not found
 */
router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    deleteEntry(COLLECTION)
);

/**
 * @route POST /pending/:id
 * @description Submit a monster update for approval (contributor access)
 * 
 * @openapi
 * /app/v1/monsters/pending/{id}:
 *   post:
 *     summary: Submit a monster update for approval
 *     tags: [Monster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the monster being updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Monster'
 *     responses:
 *       201:
 *         description: Update for {id} sent, awaiting approval.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Monster'
 *       400:
 *         description: Invalid input or submission error
 */
router.put(
    "/pending/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "contributor" ] }),
    updatePendingEntry<Monster>("monsterPending")
);

export default router;