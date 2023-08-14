import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import UserController from "../../controllers/userController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      methods: ["PUT"],
      origin: "*",
      optionsSuccessStatus: 200,
    });
    if (req.method === "PUT") {
      const updateResponse = await UserController.updateUserData(req, res);
      res.status(200).json({ userUpdated: updateResponse });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
  }
}
