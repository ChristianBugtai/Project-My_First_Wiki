import { RepositoryError } from "../errors/errors";
import { 
    getDocumentById,
    updateDocument
 } from "../repositories/firestoreRepository";

export const approvePendingEntry = async <T>(pendingCollectionName: string, collectionName: string, pendingId: string): Promise<T> => {
    const data = await getDocumentById<T & { entry_id?:string }>(pendingCollectionName, pendingId);

    const entryId = data.entry_id;

    if (!entryId) {
		throw new RepositoryError("Missing entry_id in pending entry", "MISSING_ENTRY_ID", 400);
	}
    
    const { entry_id, id, ...cleanedData } = data;

    const updatedData = await updateDocument<T>(collectionName, entryId, cleanedData as T )

    return updatedData
}