import { NextApiRequest, NextApiResponse } from "next";
import { firestoreDB, realtimeDB } from "../../lib/firestoreConn";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      methods: ["POST"],
      origin: "*",
      optionsSuccessStatus: 200,
    });

    if (req.method === "POST") {
      const { chatroomID, email, roomId } = req.body;
      const ref = realtimeDB.ref(`rooms/${chatroomID}`);
      const firestoreRef = firestoreDB.collection("rooms").doc(roomId);
      const prevData = firestoreRef.get();
      await ref.update({
        guest: email,
      });
      await firestoreRef.update({ ...prevData, guest: email });
      res.send({ ok: true });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
  }
}
