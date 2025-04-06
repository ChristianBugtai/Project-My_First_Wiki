import { Request, Response, NextFunction } from "express";

import * as firestore from "../repositories/firestoreRepository"

/**
 * @description Get the entry of a given id from a given collection.
 * @route GET /:id
 * @param collectionName name of the firebase collection 
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
            res.status(200).json({message: `${collectionName} Retrieved`, data: data});
        } catch (error) {
            next(error)
        }
    };
};

/**
 * @description Get all entries from a given collection.
 * @route GET /
 * @param collectionName name of the firebase collection 
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
            res.status(200).json({message: `${collectionName}s Retrieved`, data: data});
        } catch (error) {
            next(error)
        }
    };
};

/**
 * @description Add a new entry into a given collection.
 * @route POST /
 * @param collectionName name of the firebase collection 
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
            res.status(200).json({message:`${collectionName} Added`, data: data});
        } catch (error) {
            next(error)
        }
    };
};

/**
 * @description Update the existing entry of the given id in a given collection.
 * @route PUT /
 * @param collectionName name of the firebase collection 
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
            res.status(200).json({message: `${collectionName} Updated`, data: data});
        } catch (error) {
            next(error)
        }
    };
};

/**
 * @description Delete the entry of the given id in a given collection.
 * @route DELETE /
 * @param collectionName name of the firebase collection 
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
            res.status(200).json({mesasge: `${collectionName} ${id} Deleted`});
        } catch (error) {
            next(error)
        }
    };
};