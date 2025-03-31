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
        res.status(200).json({message: `Item Retrieved`, data: data});
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
        res.status(200).json({message: `Items Retrieved`, data: data});
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
        res.status(200).json({message:`Item Added`, data: data});
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
        res.status(200).json({message: `Item Updated`, data: data});
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
        res.status(200).json({mesasge: `Item ${id} Deleted`});
    } catch (error) {
        next(error)
    }
};