import { Request, Response, NextFunction } from "express";

export const getItem = (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).send("Items Retrieved");
    } catch (error) {
        next(error)
    }
};

export const getItems = (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).send("Item Retrieved");
    } catch (error) {
        next(error)
    }
};

export const addItem = (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).send("Item Added");
    } catch (error) {
        next(error)
    }
};

export const updateItem = (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).send("Item Updated");
    } catch (error) {
        next(error)
    }
};

export const deleteItem = (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).send("Item Deleted");
    } catch (error) {
        next(error)
    }
};