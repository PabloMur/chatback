import { NextApiRequest, NextApiResponse } from "next";
import CheckEmailController from "../../controllers/checkEmailController";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      await NextCors(req, res, {
        methods: ["POST"],
        origin: "*",
        optionsSuccessStatus: 200,
      });
      CheckEmailController.checkEmail(req, res);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
  }
}
