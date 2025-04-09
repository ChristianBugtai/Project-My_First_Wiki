import { Request, Response, NextFunction } from "express";

import * as firestore from "../repositories/firestoreRepository"
import { HTTP_STATUS } from "src/constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Get the entry of a given id from a given collection.
 * @route GET /:id
 * @param {string} collectionName name of the firebase collection 
 * @returns {promise<void>}
 */
export const getEntryById = <T>(collectionName: string) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> => {
        try{
            const data = await firestore.getDocumentById<T>(collectionName, req.params.id);

            res.status(HTTP_STATUS.OK).json(
                successResponse(data, `${collectionName} Retrieved`)
            );
        } catch (error) {
            next(error)
        }
    };
};

/**
 * @description Get all entries from a given collection.
 * @route GET /
 * @param {string} collectionName name of the firebase collection 
 * @returns {promise<void>}
 */
export const getEntries = <T>(collectionName: string) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> => {
        try{
            const data = await firestore.getDocuments<T>(collectionName);

            res.status(HTTP_STATUS.OK).json(
                successResponse(data, `${collectionName}s Retrieved`)
            );
        } catch (error) {
            next(error)
        }
    };
};

/**
 * @description Add a new entry into a given collection.
 * @route POST /
 * @param {string} collectionName name of the firebase collection 
 * @returns {promise<void>}
 */
export const addEntry =  <T extends object>(collectionName: string) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> => {
        try{
            const data = await firestore.addDocument<T>(collectionName, req.body)

            res.status(HTTP_STATUS.CREATED).json(
                successResponse(data, `${collectionName} Added`)
            );
        } catch (error) {
            next(error)
        }
    };
};

/**
 * @description Update the existing entry of the given id in a given collection.
 * @route PUT /
 * @param {string} collectionName name of the firebase collection 
 * @returns {promise<void>}
 */
export const updateEntry =  <T>(collectionName: string) => {
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

/**
 * @description Delete the entry of the given id in a given collection.
 * @route DELETE /
 * @param {string} collectionName name of the firebase collection 
 * @returns {promise<void>}
 */
export const deleteEntry = (collectionName: string) => {
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> => {
        try{
            const id = await firestore.deleteDocument(collectionName, req.params.id)

            res.status(HTTP_STATUS.OK).json(
                successResponse(undefined, `${collectionName} ${id} Deleted`)
            );
        } catch (error) {
            next(error)
        }
    };
};