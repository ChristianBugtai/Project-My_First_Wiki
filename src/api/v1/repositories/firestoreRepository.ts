import { db } from "../../../../config/firebaseConfig";

export const runTransaction = async <T>(
	operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
	try {
		return await db.runTransaction(operations);
	} catch (error) {
		console.error("Transaction failed:", error);
		throw error;
	}
};

export const addDocument = async <T> (
    collectionName: string,
    data: Partial<T>,
): Promise<string> => {
	try {
        let docRef: FirebaseFirestore.DocumentReference;

        docRef = await db.collection(collectionName).add(data);

        return docRef.id;
    } catch (error) {
		console.error(`Failed to create document in ${collectionName}:`, error);
		throw error;
	}
};

export const getDocuments = async (
	collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
	try {
		return await db.collection(collectionName).get();
	} catch (error) {
		console.error(
			`Failed to fetch documents from ${collectionName}:`,
			error
		);
		throw error;
	}
};

export const getDocumentById = async (
	collectionName: string,
	id: string
): Promise<FirebaseFirestore.DocumentSnapshot | null> => {
	try {
		const doc: FirebaseFirestore.DocumentSnapshot = await db
			.collection(collectionName)
			.doc(id)
			.get();
		return doc?.exists ? doc : null;
	} catch (error) {
		console.error(
			`Failed to fetch document ${id} from ${collectionName}:`,
			error
		);
		throw error;
	}
};

export const updateDocument = async <T>(
	collectionName: string,
	id: string,
	data: Partial<T>
): Promise<void> => {
	try {
		await db.collection(collectionName).doc(id).update(data);
	} catch (error) {
		console.error(
			`Failed to update document ${id} in ${collectionName}:`,
			error
		);
		throw error;
	}
};

export const deleteDocument = async (
	collectionName: string,
	id: string,
	transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
	try {
		const docRef: FirebaseFirestore.DocumentReference = db
			.collection(collectionName)
			.doc(id);
		if (transaction) {
			transaction.delete(docRef);
		} else {
			await docRef.delete();
		}
	} catch (error) {
		console.error(
			`Failed to delete document ${id} from ${collectionName}:`,
			error
		);
		throw error;
	}
};