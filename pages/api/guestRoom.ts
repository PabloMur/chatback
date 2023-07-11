import { NextApiRequest, NextApiResponse } from "next";
import { realtimeDB } from "../../lib/firestoreConn";
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
      const { chatroomID, email } = req.body;
      const ref = realtimeDB.ref(`rooms/${chatroomID}`);
      await ref.update({
        guest: email,
      });
      res.send({ ok: true });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
  }
}
