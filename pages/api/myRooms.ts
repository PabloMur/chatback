import { NextApiRequest, NextApiResponse } from "next";
import { firestoreDB } from "../../lib/firestoreConn";
import NextCors from "nextjs-cors";

type Data = {
  roomIds?: string[];
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
    const { email } = req.body;

    try {
      const querySnapshot = await firestoreDB
        .collection("rooms")
        .where("createdBy", "==", email)
        .get();

      const roomIds = querySnapshot.docs.map((doc) => doc.id);

      res.status(200).json({ roomIds });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar las chatrooms" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
