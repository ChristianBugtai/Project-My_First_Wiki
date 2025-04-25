import { RepositoryError } from "../errors/errors";
import { 
    getDocumentById,
    updateDocument
 } from "../repositories/firestoreRepository";

 /**
 * Approves a pending entry by promoting it to the main collection.
 *
 * This function retrieves a pending document from the specified pending collection,
 * extracts its `entry_id`, and updates the corresponding document in the main collection
 * using the pending document's content (excluding metadata like `entry_id` and `id`).
 * 
 * @template T - The type of the document being updated
 * @param {string} pendingCollectionName - Name of the Firestore collection containing pending entries
 * @param {string} collectionName - Name of the main Firestore collection to update
 * @param {string} pendingId - The Firestore document ID of the pending entry to approve
 * 
 * @throws {RepositoryError} If `entry_id` is missing in the pending document
 * 
 * @returns {Promise<T>} The updated document from the main collection
 */
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