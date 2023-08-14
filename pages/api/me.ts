import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
//import userController from "../../controllers/userController";

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
      //const userData = await userController.getUserData(req, res);
      res.status(200).json({ test: "TEST" });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
  }
}
