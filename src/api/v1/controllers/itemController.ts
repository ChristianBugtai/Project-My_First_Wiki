import { Request, Response, NextFunction } from "express";

import type { Item } from "../models/gameModels"
import * as firestore from "../repositories/firestoreRepository"

const COLLECTION = "ITEMS"

export const getDocumentById = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try{
        const data = await firestore.getDocumentById<Item>(COLLECTION, req.params.id);
        res.status(200).send(`Items Retrieved ${data}`);
    } catch (error) {
        next(error)
    }
};

export const getDocuments = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try{
        const data = await firestore.getDocuments<Item>(COLLECTION);
        res.status(200).send(`Item Retrieved ${data}`);
    } catch (error) {
        next(error)
    }
};

export const addDocument = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try{
        const data = await firestore.addDocument<Item>(COLLECTION, req.body)
        res.status(200).send(`Item Added, ${data}`);
    } catch (error) {
        next(error)
    }
};

export const updateDocument = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try{
        const data = await firestore.updateDocument<Item>(COLLECTION, req.params.id, req.body)
        res.status(200).send(`Item Updated, ${data}`);
    } catch (error) {
        next(error)
    }
};

export const deleteDocument = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try{
        const id = await firestore.deleteDocument(COLLECTION, req.params.id)
        res.status(200).send(`Item ${id} Deleted`);
    } catch (error) {
        next(error)
    }
};