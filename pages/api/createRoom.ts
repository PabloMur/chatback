import { NextApiRequest, NextApiResponse } from "next";
import roomController from "../../controllers/roomController";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    origin: "*",
    methods: ["POST"],
    optionsSuccessStatus: 200,
  });
  if (req.method === "POST") {
    const roomCreated = await roomController.createChatroom(req, res);
    if (roomCreated)
      res.status(200).json({
        roomCreated: {
          roomId: roomCreated,
        },
      });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
