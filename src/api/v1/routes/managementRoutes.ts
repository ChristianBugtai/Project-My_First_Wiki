import express, { Router } from "express";

import type { Item, Location, Monster, Treasure } from "../models/gameModels"
import authenticate  from "../middleware/authentication";
import isAuthorized from "../middleware/authorization";
import { approveEntry, getPendingEntries } from "../controllers/managementController";

const router: Router = express.Router();

const [itemCollection, locationCollection, monsterCollection, treasureCollection]
    = ["Item", "Location", "Monster", "Treasure"]

const [pendingItemCollection, pendingLocationCollection, pendingMonsterCollection, pendingTreasureCollection] 
    = ["itemPending", "locationPending", "monsterPending", "treasurePending"]

    /**
 * @route GET /items/:id
 * @description Retrieve up to 5 pending updates for an item by entry ID
 * 
 * @openapi
 * /app/v1/management/items/{id}:
 *   get:
 *     summary: View pending updates for an item
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the original item entry
 *     responses:
 *       200:
 *         description: Pending entries for the item retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Item'
 *                   - type: object
 *                     properties:
 *                       entry_id:
 *                         type: string
 *                       datetime:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid item ID
 */
router.get(
    "/items/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(pendingItemCollection)
);

/**
 * @route GET /items/approve/:id
 * @description Approve a specific pending item update
 * 
 * @openapi
 * /app/v1/management/items/approve/{id}:
 *   get:
 *     summary: Approve pending item update
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the pending item entry to approve
 *     responses:
 *       201:
 *         description: entry {id}, approved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Missing or invalid entry_id in pending data
 */
router.get(
    "/items/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Item>(pendingItemCollection, itemCollection)
);

/**
 * @route GET /locations/:id
 * @description Retrieve up to 5 pending updates for a location
 * 
 * @openapi
 * /app/v1/management/locations/{id}:
 *   get:
 *     summary: View pending updates for a location
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the original location entry
 *     responses:
 *       200:
 *         description: Pending entries for the location retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Location'
 *                   - type: object
 *                     properties:
 *                       entry_id:
 *                         type: string
 *                       datetime:
 *                         type: string
 *                         format: date-time
 */
router.get(
    "/locations/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(pendingLocationCollection)
);

/**
 * @route GET /locations/approve/:id
 * @description Approve a specific pending location update
 * 
 * @openapi
 * /app/v1/management/locations/approve/{id}:
 *   get:
 *     summary: Approve pending location update
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the pending location entry to approve
 *     responses:
 *       201:
 *         description: entry {id}, approved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
router.get(
    "/locations/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Location>(pendingLocationCollection, locationCollection)
);

/**
 * @route GET /monsters/:id
 * @description Retrieve up to 5 pending updates for a monster by entry ID
 * 
 * @openapi
 * /app/v1/management/monsters/{id}:
 *   get:
 *     summary: View pending updates for a monster
 *     tags: [Monster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the original monster entry
 *     responses:
 *       200:
 *         description: Pending entries for the monster retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Monster'
 *                   - type: object
 *                     properties:
 *                       entry_id:
 *                         type: string
 *                       datetime:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid monster ID
 */
router.get(
    "/monsters/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(pendingMonsterCollection)
);

/**
 * @route GET /monsters/approve/:id
 * @description Approve a specific pending monster update
 * 
 * @openapi
 * /app/v1/management/monsters/approve/{id}:
 *   get:
 *     summary: Approve pending monster update
 *     tags: [Monster]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the pending monster entry to approve
 *     responses:
 *       201:
 *         description: entry {id}, approved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Monster'
 *       400:
 *         description: Missing or invalid entry_id in pending data
 */
router.get(
    "/monsters/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Monster>(pendingMonsterCollection, monsterCollection)
);

/**
 * @route GET /treasures/:id
 * @description Retrieve up to 5 pending updates for a treasure by entry ID
 * 
 * @openapi
 * /app/v1/management/treasures/{id}:
 *   get:
 *     summary: View pending updates for a treasure
 *     tags: [Treasure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the original treasure entry
 *     responses:
 *       200:
 *         description: Pending entries for the treasure retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Treasure'
 *                   - type: object
 *                     properties:
 *                       entry_id:
 *                         type: string
 *                       datetime:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid treasure ID
 */
router.get(
    "/treasures/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(pendingTreasureCollection)
);

/**
 * @route GET /treasures/approve/:id
 * @description Approve a specific pending treasure update
 * 
 * @openapi
 * /app/v1/management/treasures/approve/{id}:
 *   get:
 *     summary: Approve pending treasure update
 *     tags: [Treasure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the pending treasure entry to approve
 *     responses:
 *       201:
 *         description: entry {id}, approved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treasure'
 *       400:
 *         description: Missing or invalid entry_id in pending data
 */
router.get(
    "/treasures/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Treasure>(pendingTreasureCollection, treasureCollection)
);

export default router;