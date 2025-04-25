import { Request, Response, NextFunction } from "express";
import { Timestamp } from "firebase-admin/firestore";

import * as firestore from "../repositories/firestoreRepository"
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Creates a new entity on a with entry_id and datetime on a pending database.
 * @route POST /
 * @param {string} id id of the main entry.
 * @param {string} collectionName name of the firebase collection 
 * @returns {promise<void>}
 */
export const updatePendingEntry =  <T extends Object> (collectionName: string) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> => {
        try{
            const entryData = { 
                entry_id: req.params.id,
                datetime: Timestamp.now(),
                ... req.body
                }; 
            const data = await firestore.addDocument<T>(collectionName, entryData)

            res.status(HTTP_STATUS.CREATED).json(
                successResponse(data, `Update for ${req.params.id} sent, awaiting approval.`)
            );
        } catch (error) {
            next(error)
        }
    };
};
