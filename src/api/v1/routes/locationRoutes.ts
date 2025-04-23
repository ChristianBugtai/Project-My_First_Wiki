import express, { Router } from "express";

import type { Location } from "../models/gameModels"
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
import redirectUnauthorized from "../middleware/redirectUnauthorized";

const router: Router = express.Router();

const COLLECTION:string = "Location"

// "/api/v1/locations"
/**
 * @route GET /:id
 * @description Get a location by id
 * 
 * @openapi
 * /app/v1/locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the location to retrieve
 *     responses:
 *       200:
 *         description: The location matching the given ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.get(
    "/:id", 
    getEntryById<Location>(COLLECTION)
);

/**
 * @route GET /
 * @description Get all locations
 * 
 * @openapi
 * /app/v1/locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
router.get(
    "/", 
    getEntries<Location>(COLLECTION)
);

/**
 * @route POST /
 * @description Create a new location
 * 
 * @openapi
 * /app/v1/locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Invalid input
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    addEntry<Location>(COLLECTION)
);

/**
 * @route PUT /:id
 * @description Update a location by ID
 * 
 * @openapi
 * /app/v1/locations/{id}:
 *   put:
 *     summary: Update a location by ID
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the location to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.put(
    "/:id",
    authenticate,
    redirectUnauthorized("/pending/:id"),
    updateEntry<Location>(COLLECTION)
);

/**
 * @route DELETE /:id
 * @description Delete a location by ID
 * 
 * @openapi
 * /app/v1/locations/{id}:
 *   delete:
 *     summary: Delete a location by ID
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the location to delete
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
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
    updatePendingEntry<Location>("locationPending")
);

export default router;