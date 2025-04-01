import { Request, Response, NextFunction } from "express";

import * as firestore from "../repositories/firestoreRepository"

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