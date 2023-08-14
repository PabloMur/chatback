import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

class userController {
  static async getUserData(req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Missing authorization token" });
      return;
    }

    try {
      const secret = process.env.SECRET_KEY as any;
      const decodedToken = jwt.verify(token, secret) as { email: string };
      const userData = await UserModel.getMe(decodedToken.email);
      return userData;
    } catch (error) {
      res.status(401).json({ error: error });
    }
  }
}

export default userController;
