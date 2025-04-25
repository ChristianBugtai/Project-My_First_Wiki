import { Request, Response, NextFunction } from "express";
import { Timestamp } from "firebase-admin/firestore";
import * as firestore from "../src/api/v1/repositories/firestoreRepository";
import { updatePendingEntry } from "../src/api/v1/controllers/pendingController";

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
    addDocument: jest.fn(),
}));

const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res as Response;
};

const mockNext: NextFunction = jest.fn();

describe("updatePendingEntry", () => {
    const mockData = {
        id: "101",
        name: "Pending Entry",
        description: "Awaiting approval",
        datetime: Timestamp.now(),
        entry_id: "101"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should add a document and respond with 201", async () => {
        const req = {
            params: { id: "101" },
            body: {
                name: "Pending Entry",
                description: "Awaiting approval"
            }
        } as Partial<Request> as Request;

        const res = mockResponse();
        (firestore.addDocument as jest.Mock).mockResolvedValue(mockData);

        await updatePendingEntry("itemPending")(req, res, mockNext);

        expect(firestore.addDocument).toHaveBeenCalledWith("itemPending", expect.objectContaining({
            entry_id: "101",
            name: "Pending Entry",
            description: "Awaiting approval"
        }));

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Update for 101 sent, awaiting approval.",
            data: mockData,
            status: "success"
        });
    });

    it("should handle errors and call next", async () => {
        const error = new Error("Firestore failure");
        const req = {
            params: { id: "101" },
            body: {
                name: "Invalid Entry"
            }
        } as Partial<Request> as Request;

        const res = mockResponse();
        (firestore.addDocument as jest.Mock).mockRejectedValue(error);

        await updatePendingEntry("itemPending")(req, res, mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});
