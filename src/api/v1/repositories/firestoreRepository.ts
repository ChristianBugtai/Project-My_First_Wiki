import { error } from "console";
import { db } from "../../../../config/firebaseConfig";
import { RepositoryError } from "../errors/errors";
import { 
	getErrorCode, 
	getErrorMessage, 
	getFirebaseErrorStatusCode 
} from "../utils/errorUtils";

/**
 * @description retrieves a document in firestore given a collection name and id.
 * @param {string} collectionName name of the collection.
 * @param {string} id id of document.
 * @returns {T} a json file with the id and all the fields in the collection.
 */
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
                throw new RepositoryError(
                    `Document not found in collection ${collectionName} with id ${id}`,
					"DOCUMENT_NOT_FOUND",
					404
                )
            }
        const data = doc.data() as T
		return {
            id: doc.id,
            ...data
        };
	} catch (error: unknown) {
		if (error instanceof RepositoryError){
			throw error;
		}
	}

	throw new RepositoryError(
		`Failed to fetch document ${id} from ${collectionName}: ${getErrorMessage(
			error
		)}`,
		getErrorCode(error),
		getFirebaseErrorStatusCode(error)
	)
};

/**
 * @description Retrieves all the documents from a firestore collection.
 * @param {string} collectionName name of the collection.
 * @returns {T} a list of json files with the id and all the fields in the collection.
 */
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
	} catch (error: unknown) {
		throw new RepositoryError(
			`Failed to fetch documents from ${collectionName}: ${getErrorMessage(
				error
			)}`,
			getErrorCode(error),
			getFirebaseErrorStatusCode(error)
		)
	}
};

/**
 * @description aadds a document to a given collection.
 * @param {string} collectionName name of the collection.
 * @returns {T} a json file with the id and all the fields in the collection of the added document.
 */
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
    } catch (error: unknown) {
		throw new RepositoryError(
            `Failed to create document in ${collectionName}: ${getErrorMessage(
                error
            )}`,
            getErrorCode(error),
            getFirebaseErrorStatusCode(error)
        );
	}
};

/**
 * @description Updates the data of the document given its id and colection.
 * @param {string} collectionName name of the collection.
 * @param {string} id id of document.
 * @returns {T} a json file with the id and all the fields in the collection of the updated document.
 */
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
	} catch (error: unknown) {
		throw new RepositoryError(
            `Failed to update document ${id} in ${collectionName}: ${getErrorMessage(
                error
            )}`,
            getErrorCode(error),
            getFirebaseErrorStatusCode(error)
        );
	}
};

/**
 * @description Deletes a document given its id and colection.
 * @param {string} collectionName name of the collection.
 * @param {string} id id of document.
 * @returns {string} the id of the deleted document.
 */
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
	} catch (error: unknown) {
		throw new RepositoryError(
            `Failed to delete document ${id} from ${collectionName}: ${getErrorMessage(
                error
            )}`,
            getErrorCode(error),
            getFirebaseErrorStatusCode(error)
        );
	}
};