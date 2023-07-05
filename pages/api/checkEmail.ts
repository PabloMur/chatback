import { NextApiRequest, NextApiResponse } from "next";
import CheckEmailController from "../../controllers/checkEmailController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    CheckEmailController.checkEmail(req, res);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
