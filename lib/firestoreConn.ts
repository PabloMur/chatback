import * as admin from "firebase-admin";

const secretKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as any);
const databaseURLSecretKey = process.env.DATABASEURL_SRECRETKEY as any;

const firebaseApp = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(secretKey as admin.ServiceAccount),
      databaseURL: databaseURLSecretKey,
    });

const firestoreDB = admin.firestore();
const realtimeDB = admin.database();

export { firestoreDB, realtimeDB };
