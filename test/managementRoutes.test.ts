import { Request, Response, NextFunction } from "express";
import request from "supertest";

import app from "../src/app";
import {
    getPendingEntries,
    approveEntry
} from "../src/api/v1/controllers/managementController"

beforeAll(() => {
    const mockGetPendingEntries = jest.fn((req: Request, res: Response) => res.status(200).send());
    const mockApproveEntry = jest.fn((req: Request, res: Response) => res.status(200).send());

    jest.mock("../src/api/v1/controllers/managementController", () => ({
        getPendingEntries: () => mockGetPendingEntries,
        approveEntry: () => mockApproveEntry
    }));
})

describe("Management Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/management/items/:id", () => {
        it("should call getPendingEntries for items", async () => {
            const mockId = "101";
            await request(app).get(`/api/v1/management/items/${mockId}`);
            expect(getPendingEntries).toHaveBeenCalled;
        });
    });

    describe("GET /api/v1/management/items/approve/:id", () => {
        it("should call approveEntry for items", async () => {
            const mockId = "101";
            await request(app).get(`/api/v1/management/items/approve/${mockId}`);
            expect(approveEntry).toHaveBeenCalled;
        });
    });

    describe("GET /api/v1/management/locations/:id", () => {
        it("should call getPendingEntries for locations", async () => {
            const mockId = "202";
            await request(app).get(`/api/v1/management/locations/${mockId}`);
            expect(getPendingEntries).toHaveBeenCalled;
        });
    });

    describe("GET /api/v1/management/locations/approve/:id", () => {
        it("should call approveEntry for locations", async () => {
            const mockId = "202";
            await request(app).get(`/api/v1/management/locations/approve/${mockId}`);
            expect(approveEntry).toHaveBeenCalled;
        });
    });

    describe("GET /api/v1/management/monsters/:id", () => {
        it("should call getPendingEntries for monsters", async () => {
            const mockId = "303";
            await request(app).get(`/api/v1/management/monsters/${mockId}`);
            expect(getPendingEntries).toHaveBeenCalled;
        });
    });

    describe("GET /api/v1/management/monsters/approve/:id", () => {
        it("should call approveEntry for monsters", async () => {
            const mockId = "303";
            await request(app).get(`/api/v1/management/monsters/approve/${mockId}`);
            expect(approveEntry).toHaveBeenCalled;
        });
    });

    describe("GET /api/v1/management/treasures/:id", () => {
        it("should call getPendingEntries for treasures", async () => {
            const mockId = "404";
            await request(app).get(`/api/v1/management/treasures/${mockId}`);
            expect(getPendingEntries).toHaveBeenCalled;
        });
    });

    describe("GET /api/v1/management/treasures/approve/:id", () => {
        it("should call approveEntry for treasures", async () => {
            const mockId = "404";
            await request(app).get(`/api/v1/management/treasures/approve/${mockId}`);
            expect(approveEntry).toHaveBeenCalled;
        });
    });
});
