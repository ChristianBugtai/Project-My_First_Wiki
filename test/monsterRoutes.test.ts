import request from "supertest";
import { Request, Response, NextFunction } from "express";

import app from "../src/app"
import { 
    getEntryById, 
    getEntries, 
    addEntry, 
    updateEntry, 
    deleteEntry 
} from "../src/api/v1/controllers/entryController"; 

beforeAll(() => {
    const mockGetEntryById = jest.fn((req: Request, res: Response) => res.status(200).send());
    const mockGetEntries = jest.fn((req: Request, res: Response) => res.status(200).send());
    const mockAddEntry = jest.fn((req: Request, res: Response) => res.status(201).send());
    const mockUpdateEntry = jest.fn((req: Request, res: Response) => res.status(200).send());
    const mockDeleteEntry = jest.fn((req: Request, res: Response) => res.status(200).send());

    jest.mock("../src/api/v1/controllers/entryController", () => ({
        getEntryById: () => mockGetEntryById,
        getEntries: () => mockGetEntries,
        addEntry: () => mockAddEntry,
        updateEntry: () => mockUpdateEntry,
        deleteEntry: () => mockDeleteEntry,
    }));
})

describe("Monster Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/monsters/:id", () => {
        it("should call the getEntryById controller", async () => {
            const mockId: string = "101";

            await request(app).get(`/api/v1/monsters/${mockId}`)
            expect(getEntryById).toHaveBeenCalled
        })
    })

    describe("GET /api/v1/monsters/", () => {
        it("should call the getEntries controller", async () => {

            await request(app).get(`/api/v1/monsters/}`)
            expect(getEntries).toHaveBeenCalled
        })
    })

    describe("POST /api/v1/monsters/", () => {
        it("should call the addEntry controller", async () => {

            await request(app).post(`/api/v1/monsters/}`)
            expect(addEntry).toHaveBeenCalled
        })
    })

    describe("PUT /api/v1/monsters/:id", () => {
        it("should call the updateEntry controller", async () => {
            const mockId: string = "101";

            await request(app).put(`/api/v1/monsters/${mockId}}`)
            expect(updateEntry).toHaveBeenCalled
        })
    })

    describe("DELETE /api/v1/monsters/:id", () => {
        it("should call the updateEntry controller", async () => {
            const mockId: string = "101";

            await request(app).delete(`/api/v1/monsters/${mockId}}`)
            expect(deleteEntry).toHaveBeenCalled
        })
    })
});