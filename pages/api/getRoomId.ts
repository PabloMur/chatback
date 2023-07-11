import { NextApiRequest, NextApiResponse } from "next";
import { firestoreDB } from "../../lib/firestoreConn";
import NextCors from "nextjs-cors";

type Data = {
  roomId?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Configura los orígenes permitidos de tu API aquí
    origin: "*",
    methods: ["POST"],
    optionsSuccessStatus: 200,
  });
  if (req.method === "POST") {
    const { roomId } = req.body;

    try {
      console.log(roomId);
      const snapshotRef = firestoreDB.collection("rooms").doc(roomId);
      const snapshot = await snapshotRef.get();
      let data = snapshot.data();
      if (data !== undefined) res.status(200).json({ roomId: data.roomId });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar la chatroom" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
