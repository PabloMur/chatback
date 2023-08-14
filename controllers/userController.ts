import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";
import { error } from "console";
//import NextCors from "nextjs-cors";

class userController {
  static async getUserData(req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers;
    const { email } = req.body;
    const token = authorization?.replace("Bearer ", "");
    try {
      if (!token) {
        res.status(401).json({ error: "Missing authorization token" });
        return;
      }
      const secret = process.env.SECRET_KEY as any;
      const decodedToken = jwt.verify(token, secret) as { email: string };
      if (decodedToken.email == email) {
        const userData = await UserModel.getMe(email);
        return userData;
      } else {
        return error;
      }
    } catch (error) {
      res.status(401).json({ error: error });
    }
  }
}

export default userController;
