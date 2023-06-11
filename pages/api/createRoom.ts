import type { NextApiRequest, NextApiResponse } from "next";
import { firestoreDB, realtimeDB } from "../../lib/firestoreConn";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import NextCors from "nextjs-cors";

type Data = {
  roomId?: string;
  error?: string;
};

type Message = {
  from: "owner" | "guest";
  message: string;
};

type ChatroomData = {
  createdBy: string;
  guest: null | string;
  messages: Message[];
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
      const decodedToken = jwt.verify(token, secret) as { email: string };

      // Crear la chatroom en Firebase Realtime Database
      const id = nanoid();
      const ref = realtimeDB.ref(`rooms/${id}`);
      await ref.set({
        createdBy: decodedToken.email,
        guest: null,
        messages: [],
      });

      // Obtener los últimos 4 dígitos del key
      const roomId = ref.key?.slice(-4)?.toUpperCase();

      if (!roomId) {
        res.status(500).json({ error: "Failed to create room" });
        return;
      }

      // Guardar la información de la chatroom en Firestore
      await firestoreDB.collection("rooms").doc(roomId).set({
        roomId: ref.key, // Guardar el key completo como campo roomId
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
