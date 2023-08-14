import type { NextApiRequest, NextApiResponse } from "next";
import userController from "../../controllers/userController";
//import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userData = await userController.getUserData(req, res);
    res.status(200).json({ userData });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
