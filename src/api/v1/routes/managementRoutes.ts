import express, { Router } from "express";

import type { Item, Location, Monster, Treasure } from "../models/gameModels"
import authenticate  from "../middleware/authentication";
import isAuthorized from "../middleware/authorization";
import { approveEntry, getPendingEntries } from "../controllers/managementController";

const router: Router = express.Router();

const [itemCollection, locationCollection, monsterCollection, treasureCollection] 
    = ["itemPending", "locationPending", "monsterPending", "treasurePending"] 

router.get(
    "/items/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(itemCollection)
);

router.put(
    "/items/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Item>(itemCollection)
);

router.get(
    "/locations/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(locationCollection)
);

router.put(
    "/locations/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Location>(locationCollection)
);

router.get(
    "/monsters/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(monsterCollection)
);

router.put(
    "/monsters/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Monster>(monsterCollection)
);

router.get(
    "/treasures/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    getPendingEntries(treasureCollection)
);

router.put(
    "/treasures/approve/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "trustedContributor"] }),
    approveEntry<Treasure>(treasureCollection)
);

export default router;