import { initializeApp, cert, ServiceAccount, AppOptions, App, getApps } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth"

/**
 * Retrieves Firebase configuration from environment variables
 *
 * @returns {AppOptions} Firebase application configuration object
 * @throws {Error} If any required environment variables are missing
 */
const getFirebaseConfig = (): AppOptions => {
    const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
        process.env;
    if (
        !FIREBASE_PROJECT_ID ||
        !FIREBASE_CLIENT_EMAIL ||
        !FIREBASE_PRIVATE_KEY
    ) {
        // This really should be a custom error type
        throw new Error(
            "Missing Firebase configuaration. Please check your environment variables"
        );
    }
    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        // replace escaped newlines in the private key string with actual newlines
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
    return {
        credential: cert(serviceAccount),
    };
};

/**
 * Initializes Firebase Admin SDK if not already initialized
 *
 * This function implements the singleton pattern to ensure only
 * one Firebase app instance is created.
 *
 * @returns {App} Firebase Admin app instance
 */
const initializeFirebaseAdmin = (): App => {
    // check if an app is already initialized
    const existingApp: App = getApps()[0];
    if (existingApp) {
        // return existing app if found
        return existingApp;
    }
    // otherwise create and return new app
    return initializeApp(getFirebaseConfig());
};

// Initialize the Firebase Admin app
const app: App = initializeFirebaseAdmin();

const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };