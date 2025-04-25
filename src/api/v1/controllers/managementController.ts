import { Request, Response, NextFunction } from "express";

import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";
import { getDocumentsByFieldValue } from "../repositories/firestoreRepository";
import { approvePendingEntry } from "../service/managementService"

/**
 * @description Get 5 pending updates on an entry.
 * @route GET /:id
 * @param {string} id id of the entry.
 * @param {string} pendingCollectionName name of the pending firebase collection 
 * @returns {promise<void>}
 */
export const getPendingEntries = (pendingCollectionName: string) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> => {
        try{
            const data = await getDocumentsByFieldValue(pendingCollectionName, "entry_id", req.params.id, 5);

            res.status(HTTP_STATUS.OK).json(
                successResponse(data, `pending entries for ${req.params.id}, retrieved`)
            );
        } catch (error) {
            next(error)
        }
    }
}

/**
 * @description updates the main database with the selected pending entry.
 * @route GET /:id
 * @param {string} id id of the pending entry.
 * @param {string} collectionName name of the pending firebase collection
 * @param {string} collectionName name of the main firebase collection 
 * @returns {promise<void>}
 */
export const approveEntry = <T>(pendingCollectionName: string, collectionName: string) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> => {
        try{
            const data = await approvePendingEntry<T>(pendingCollectionName, collectionName, req.params.id)

            res.status(HTTP_STATUS.OK).json(
                successResponse(data, `entry ${req.params.id}, approved`)
            );
        } catch (error) {
            next(error)
        }
    };
}
