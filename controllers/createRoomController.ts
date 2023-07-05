import { NextApiRequest, NextApiResponse } from "next";
import CreateChatroomModel from "../models/ChatroomModel";

class CreateChatroomController {
  static async createChatroom(req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Missing authorization token" });
      return;
    }

    try {
      const roomId = await CreateChatroomModel.createChatroom(token);
      res.status(200).json({ roomId });
    } catch (error) {
      res.status(401).json({ error: error });
    }
  }
}

export default CreateChatroomController;
