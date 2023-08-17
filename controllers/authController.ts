import { NextApiRequest, NextApiResponse } from "next";
import AuthModel from "../models/AuthModel";
import jwt from "jsonwebtoken";

class AuthController {
  static async createAuth(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const created = await AuthModel.createAuth(email, password);

    if (created) {
      res.status(200).json({ authCreated: true });
    } else {
      res.status(500).json({ error: "Failed to create auth" });
    }
  }
  static async deleteAuth(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ error: "Missing authorization token" });
      }

      const token = authorization.replace("Bearer ", "");
      const secret = process.env.SECRET_KEY as string;
      const decodedToken = jwt.verify(token, secret) as any;

      if (!decodedToken.email) {
        return res.status(401).json({ error: "Invalid email in token" });
      }

      const authDeleted = await AuthModel.deleteAuth(decodedToken.email);
      return authDeleted;
    } catch (error) {
      return res.status(500).json({ error: "An error occurred" });
    }
  }
}

export default AuthController;
