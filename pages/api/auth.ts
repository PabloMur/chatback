import type { NextApiRequest, NextApiResponse } from "next";
import AuthController from "../../controllers/authController";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    AuthController.createAuth(req, res);
    res.status(200).json({ authCreated: true });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
