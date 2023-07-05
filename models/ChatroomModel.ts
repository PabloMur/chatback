import { firestoreDB, realtimeDB } from "../lib/firestoreConn";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { generarNumeroAleatorio } from "../lib/tools";

class CreateChatroomModel {
  static async createChatroom(token: string) {
    try {
      // Verificar y decodificar el token
      const secret = process.env.SECRET_KEY as any;
      const decodedToken = jwt.verify(token, secret) as { email: string };

      // Crear la chatroom en Firebase Realtime Database
      const id = nanoid();
      const ref = realtimeDB.ref(`rooms/${id}`);
      const initialData = {
        createdBy: decodedToken.email,
        guest: "",
        messages: [],
      };
      await ref.set(initialData);

      // Obtener los últimos 4 dígitos del key
      const roomId = generarNumeroAleatorio().toString();

      if (!roomId) {
        throw new Error("Failed to create room");
      }

      // Guardar la información de la chatroom en Firestore
      await firestoreDB.collection("rooms").doc(roomId).set({
        roomId: ref.key, // Guardar el key completo como campo roomId
        createdBy: decodedToken.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return roomId;
    } catch (error) {
      console.error("Error creating chatroom:", error);
      throw new Error("Invalid token");
    }
  }
}

export default CreateChatroomModel;
