import { db } from "../../../../config/firebaseConfig";

export const getDocumentById = async <T> (
	collectionName: string,
	id: string
): Promise<T & { id: string }> => {
	try {
		const doc: FirebaseFirestore.DocumentSnapshot = await db
			.collection(collectionName)
			.doc(id)
			.get();
        
            if (!doc.exists) {
                throw new Error(
                    `Document not found in collection ${collectionName} with id ${id}`,
                )
            }
        const data = doc.data() as T
		return {
            id: doc.id,
            ...data
        };
	} catch (error) {
		//console.error(
		//	`Failed to fetch document ${id} from ${collectionName}:`,
		//	error
		//);
		throw error;
	}
};

export const getDocuments = async <T> (
	collectionName: string
): Promise<Array<T & { id: string }>> => {
	try {
		const snapshot:FirebaseFirestore.QuerySnapshot = await db.collection(collectionName).get();

        return snapshot.docs.map((doc) => {
            const data = doc.data() as T;
            return {
                id: doc.id,
                ...data
            }
        })
	} catch (error) {
		//console.error(
		//	`Failed to fetch documents from ${collectionName}:`,
		//	error
		//);
		throw error;
	}
};

export const addDocument = async <T extends object> (
    collectionName: string,
    data: T,
): Promise<T & { id: string }> => {
	try {
        let docRef: FirebaseFirestore.DocumentReference;

        docRef = await db.collection(collectionName).add(data);

        const doc = await docRef.get();
        const savedData = doc.data() as T;

        return {
            id: doc.id,
            ...savedData,
        }
    } catch (error) {
		//console.error(`Failed to create document in ${collectionName}:`, error);
		throw error;
	}
};

export const updateDocument = async <T> (
	collectionName: string,
	id: string,
	data: Partial<T>
): Promise<T & { id: string }> => {
	try {
		const docRef = db.collection(collectionName).doc(id);
        await docRef.update(data);

        const updatedDoc = await docRef.get();
        const updatedData = updatedDoc.data() as T;

        return{
            id: updatedDoc.id,
            ...updatedData
        }
	} catch (error) {
		//console.error(
		//	`Failed to update document ${id} in ${collectionName}:`,
		//	error
		//);
		throw error;
	}
};

export const deleteDocument = async (
	collectionName: string,
	id: string,
): Promise<string> => {
	try {
		const docRef: FirebaseFirestore.DocumentReference = db
			.collection(collectionName)
			.doc(id);
		await docRef.delete();
        return id;
	} catch (error) {
		//console.error(
		//	`Failed to delete document ${id} from ${collectionName}:`,
		//	error
		//);
		throw error;
	}
};