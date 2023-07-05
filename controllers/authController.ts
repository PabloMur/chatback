import { NextApiRequest, NextApiResponse } from "next";
import AuthModel from "../models/AuthModel";

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
}

export default AuthController;
