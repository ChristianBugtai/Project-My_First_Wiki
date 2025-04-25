import { approvePendingEntry } from "../src/api/v1/service/managementService";
import * as firestore from "../src/api/v1/repositories/firestoreRepository";
import { RepositoryError } from "../src/api/v1/errors/errors";

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
}));

describe("approvePendingEntry", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should update the document and return updated data", async () => {
        const pendingId = "pending123";
        const mockEntry = {
            id: "pending123",
            entry_id: "live456",
            name: "Wiki Entry",
            description: "Pending update",
        };

        const expectedUpdate = {
            name: "Wiki Entry",
            description: "Pending update",
        };

        (firestore.getDocumentById as jest.Mock).mockResolvedValue(mockEntry);
        (firestore.updateDocument as jest.Mock).mockResolvedValue(expectedUpdate);

        const result = await approvePendingEntry("pendingEntries", "wikiEntries", pendingId);

        expect(firestore.getDocumentById).toHaveBeenCalledWith("pendingEntries", pendingId);
        expect(firestore.updateDocument).toHaveBeenCalledWith("wikiEntries", "live456", expectedUpdate);
        expect(result).toEqual(expectedUpdate);
    });

    it("should throw RepositoryError if entry_id is missing", async () => {
        const pendingId = "pending456";
        const invalidEntry = {
            id: "pending456",
            name: "Invalid Entry",
        };

        (firestore.getDocumentById as jest.Mock).mockResolvedValue(invalidEntry);

        await expect(
            approvePendingEntry("pendingEntries", "wikiEntries", pendingId)
        ).rejects.toThrow(RepositoryError);

        expect(firestore.getDocumentById).toHaveBeenCalledWith("pendingEntries", pendingId);
        expect(firestore.updateDocument).not.toHaveBeenCalled();
    });
});
