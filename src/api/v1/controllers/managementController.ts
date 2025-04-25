import { Request, Response, NextFunction } from "express";

import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";
import { 
    getDocumentsByFieldValue,
    getDocumentById,
    updateDocument
 } from "../repositories/firestoreRepository";


export const getPendingEntries = (collectionName: string) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> => {
        try{
            const data = await getDocumentsByFieldValue(collectionName, "entry_id", req.params.id, 5);

            res.status(HTTP_STATUS.OK).json(
                successResponse(data, `pending entries for ${req.params.id}, retrieved`)
            );
        } catch (error) {
            next(error)
        }
    }
}

export const approveEntry = <T>(collectionName: string) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> => {
        try{
            const data = await getDocumentById<T>(collectionName, req.params.id);
            const updatedData = await updateDocument<T>(collectionName, req.params.id, data)

            res.status(HTTP_STATUS.OK).json(
                successResponse(updatedData, `entry ${req.params.id}, approved`)
            );
        } catch (error) {
            next(error)
        }
    };
}
