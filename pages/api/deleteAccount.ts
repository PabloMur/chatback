import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import UserController from "../../controllers/userController";
import AuthController from "../../controllers/authController";

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
      const deletingUser = await UserController.deleteAccount(req, res);
      const deletingAuth = await AuthController.deleteAuth(req, res);
      if (deletingUser && deletingAuth) {
        console.log(deletingAuth, deletingUser);
        return res.status(200).json({ deletingUser, deletingAuth });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
  }
}
