import type { NextApiRequest, NextApiResponse } from "next";
import { realtimeDB } from "../../lib/firestoreConn";
import NextCors from "nextjs-cors";

type Data = {
  success: boolean;
  error?: string;
};

type Message = {
  from: "owner" | "guest";
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    methods: ["PUT"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method === "PUT") {
    const { roomId, message } = req.body;

    try {
      // Obtener la referencia a la chatroom en Realtime Database
      const roomRef = realtimeDB.ref(`rooms/${roomId}`);

      // Obtener los mensajes existentes en la chatroom
      const snapshot = await roomRef.get();
      const existingMessages: Message[] = snapshot.val()?.messages || [];

      // Crear el nuevo mensaje con guest en null por ahora
      const newMessage: Message = {
        from: "owner",
        message,
      };

      // Actualizar los mensajes en la chatroom agregando el nuevo mensaje
      await roomRef.update({
        messages: [...existingMessages, newMessage],
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to add message" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
