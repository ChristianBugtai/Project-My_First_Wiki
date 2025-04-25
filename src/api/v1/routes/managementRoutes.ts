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

router.get(
    "/items/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(pendingItemCollection)
);

router.get(
    "/items/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Item>(pendingItemCollection, itemCollection)
);

router.get(
    "/locations/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(pendingLocationCollection)
);

router.get(
    "/locations/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Location>(pendingLocationCollection, locationCollection)
);

router.get(
    "/monsters/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(pendingMonsterCollection)
);

router.get(
    "/monsters/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Monster>(pendingMonsterCollection, monsterCollection)
);

router.get(
    "/treasures/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(pendingTreasureCollection)
);

router.get(
    "/treasures/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Treasure>(pendingTreasureCollection, treasureCollection)
);

export default router;