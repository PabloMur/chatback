import { NextApiRequest, NextApiResponse } from "next";
import CreateChatroomController from "../../controllers/createRoomController";
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
    CreateChatroomController.createChatroom(req, res);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
