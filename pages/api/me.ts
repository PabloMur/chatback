import type { NextApiRequest, NextApiResponse } from "next";
import userController from "../../controllers/userController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userData = await userController.getUserData(req, res);
    res.status(200).json({ test: userData });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
