import { Request, Response, NextFunction } from "express";

import * as firestore from "../repositories/firestoreRepository"
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Update the existing entry of the given id in a given collection.
 * @route PUT /
 * @param {string} collectionName name of the firebase collection 
 * @returns {promise<void>}
 */
export const updatePendingEntry =  <T>(collectionName: string) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> => {
        try{
            const data = await firestore.updateDocument<T>(collectionName, req.params.id, req.body)

            res.status(HTTP_STATUS.OK).json(
                successResponse(data, `${collectionName} Updated`)
            );
        } catch (error) {
            next(error)
        }
    };
};
