import { Request, Response, NextFunction } from "express";
import * as controller from "../src/api/v1/controllers/entryController";
import * as firestore from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository")

const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
}

const mockNext: NextFunction  = jest.fn();

describe("Controller Tests", () => {
    const mockData = { 
        id: "101",
        name: "test",
        description: "testing",
        img: "test"
    }

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("getEntryById", () => {
        it("should return the data with status 200", async () => {
            const req = { params: { id: "101" } } as Partial<Request> as Request;
            const res = mockResponse();
            (firestore.getDocumentById as jest.Mock).mockResolvedValue(mockData);

            await controller.getEntryById("item")(req, res as Response, mockNext);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "item Retrieved",
                data: mockData
            })
        })
    })

    describe("getEntries", () => {
        it("should return with a list of entries and with status 200", async () => {
            const req = {} as Request;
            const res = mockResponse();
            (firestore.getDocuments as jest.Mock).mockResolvedValue([mockData]);

            await controller.getEntries("location")(req, res as Response, mockNext)

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "locations Retrieved",
                data: [mockData]
            })
        })
    })

    describe("addEntry", () => {
        it("should return the data and with status 201", async () => {
            const req = { body: mockData } as Request;
            const res = mockResponse();
            (firestore.addDocument as jest.Mock).mockResolvedValue(mockData);

            await controller.addEntry("monster")(req, res as Response, mockNext);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "monster Added",
                data: mockData,
            })
        })
    })

    describe("updateEntry", () => {
        it("should return the data and with status 200", async () => {
            const req = { 
                params: { id: "101" }, 
                body: { mockData } 
            } as Partial<Request> as Request;
            const res = mockResponse();
            (firestore.updateDocument as jest.Mock).mockResolvedValue(mockData);

            await controller.updateEntry("treasure")(req, res as Response, mockNext);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "treasure Updated",
                data: mockData,
            })
        })
    })

    describe("deleteEntry", () => {
        it("should return with an id and with status 200", async () => {
            const req = { params: { id: "101" } } as Partial<Request> as Request;
            const res = mockResponse();
            (firestore.deleteDocument as jest.Mock).mockResolvedValue("101");

            await controller.deleteEntry("item")(req, res as Response, mockNext);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                mesasge: "item 101 Deleted",
            })
        })
    })

    describe("Error Handling", () => {
        it("should handle errors and calls next", async () => {
            const error = new Error("Test Error");
            const req = { params: { id: "101" } } as Partial<Request> as Request;
            const res = mockResponse();
            (firestore.getDocumentById as jest.Mock).mockRejectedValue(error);

            await controller.getEntryById("location")(req, res as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        })
    })
})