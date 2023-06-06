import type { NextApiRequest, NextApiResponse } from "next";
import { firestoreDB, realtimeDB } from "../../lib/firestoreConn";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";

type Data = {
  roomId?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Missing authorization token" });
      return;
    }

    try {
      // Verificar y decodificar el token
      const secret = process.env.SECRET_KEY as any;
      const decodedToken = jwt.verify(token, secret) as {
        email: string;
      };

      // Crear la chatroom en Firebase Realtime Database
      const newRoomRef = realtimeDB.ref("test");
      await newRoomRef.set("etst");
      const roomId = newRoomRef.key?.slice(-4); // Obtener los últimos 4 dígitos del key

      if (!roomId) {
        res.status(500).json({ error: "Failed to create room" });
        return;
      }

      // Guardar la información de la chatroom en Firestore
      await firestoreDB.collection("rooms").doc(roomId).set({
        roomId: newRoomRef.key, // Guardar el key completo como campo roomId
        createdBy: decodedToken.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({ roomId });
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
