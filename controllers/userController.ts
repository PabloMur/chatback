import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

class UserController {
  static async getUserData(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { authorization } = req.headers;
      const { email } = req.body;

      if (!authorization) {
        return res.status(401).json({ error: "Missing authorization token" });
      }

      const token = authorization.replace("Bearer ", "");
      const secret = process.env.SECRET_KEY as string;
      const decodedToken = jwt.verify(token, secret) as { email: string };

      if (decodedToken.email !== email) {
        return res.status(401).json({ error: "Invalid email in token" });
      }

      const userData = await UserModel.getMe(email);
      return res.status(200).json(userData);
    } catch (error) {
      return res.status(500).json({ error: "An error occurred" });
    }
  }
  static async updateUserData(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { authorization } = req.headers;
      const { newData } = req.body;

      if (!authorization) {
        return res.status(401).json({ error: "Missing authorization token" });
      }

      const token = authorization.replace("Bearer ", "");
      const secret = process.env.SECRET_KEY as string;
      const decodedToken = jwt.verify(token, secret) as any;

      if (decodedToken.email) {
        return res.status(401).json({ error: "Invalid email in token" });
      }

      const userData = await UserModel.updateMe(decodedToken.email, newData);
      return res.status(200).json(userData);
    } catch (error) {
      return res.status(500).json({ error: "An error occurred" });
    }
  }
}

export default UserController;
