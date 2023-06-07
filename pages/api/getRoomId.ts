import { NextApiRequest, NextApiResponse } from "next";
import { firestoreDB } from "../../lib/firestoreConn";

type Data = {
  roomId?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { roomId } = req.body;

    try {
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
