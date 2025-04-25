import { getPendingEntries, approveEntry } from "../src/api/v1/controllers/managementController";
import * as managementService from "../src/api/v1/service/managementService";
import * as firestore from "../src/api/v1/repositories/firestoreRepository";

export const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
    getDocumentsByFieldValue: jest.fn(),
}));

jest.mock("../src/api/v1/service/managementService", () => ({
    approvePendingEntry: jest.fn(),
}));

describe("Management Controller", () => {
    const mockNext = jest.fn();
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    describe("getPendingEntries", () => {
        it("should return a list of pending entries filtered by entry_id", async () => {
            const mockData = [{ id: "p1", entry_id: "101" }];
            const req = { params: { id: "101" } } as any;
            const res = mockResponse();

            (firestore.getDocumentsByFieldValue as jest.Mock).mockResolvedValue(mockData);

            await getPendingEntries("pendingEntries")(req, res, mockNext);

            expect(firestore.getDocumentsByFieldValue).toHaveBeenCalledWith(
                "pendingEntries", "entry_id", "101", 5
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                message: "pending entries for 101, retrieved",
                data: mockData,
            });
        });

        it("should call next with error if Firestore fails", async () => {
            const error = new Error("Database failure");
            const req = { params: { id: "101" } } as any;
            const res = mockResponse();

            (firestore.getDocumentsByFieldValue as jest.Mock).mockRejectedValue(error);

            await getPendingEntries("pendingEntries")(req, res, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe("approveEntry", () => {
        it("should approve a pending entry and return status 200", async () => {
            const mockData = { id: "101", name: "Approved Entry" };
            const req = { params: { id: "101" } } as any;
            const res = mockResponse();

        (managementService.approvePendingEntry as jest.Mock).mockResolvedValue(mockData);

            await approveEntry("pending", "final")(req, res, mockNext);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                message: "entry 101, approved",
                data: mockData,
            });
        });

        it("should call next with error if update fails", async () => {
            const error = new Error("Update failed");
            const req = { params: { id: "101" } } as any;
            const res = mockResponse();

            (managementService.approvePendingEntry as jest.Mock).mockRejectedValue(error);

            await approveEntry("pending", "final")(req, res, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
