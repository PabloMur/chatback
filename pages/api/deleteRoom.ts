import type { NextApiRequest, NextApiResponse } from "next";
import createRoomController from "../../controllers/createRoomController";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      methods: ["DELETE"],
      origin: "*",
      optionsSuccessStatus: 200,
    });
    if (req.method === "DELETE") {
      const deleting = await createRoomController.deleteRoom(req, res);
      res.status(400).json({ roomDeleted: deleting });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
  }
}
