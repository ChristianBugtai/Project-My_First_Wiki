import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * @description Sets a custom claim on a user.
 * @route POST /setCustomClaims
 * @param {string} uid uid of the user account.
 * @param {string} uid custom role to add to the account.
 * @returns {promise<void>}
 */
export const setCustomClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { uid, claims } = req.body;

    try {
        await auth.setCustomUserClaims(uid, claims);
        res.status(HTTP_STATUS.OK).send(
            successResponse({}, `Custom claims set for user: ${uid}`)
        );
    } catch (error: unknown) {
        next(error);
    }
};