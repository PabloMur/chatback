import * as admin from "firebase-admin";
import ServiceAccount from "../key.json";

// Verificar si la aplicación ya se ha inicializado
const firebaseApp = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
      databaseURL: "https://chat-backend-ebe6e-default-rtdb.firebaseio.com",
    });

// Obtener una instancia de Firestore y Realtime Database
const firestoreDB = admin.firestore();
const realtimeDB = admin.database();

export { firestoreDB, realtimeDB };
