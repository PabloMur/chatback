import { NextApiRequest, NextApiResponse } from "next";
import CreateChatroomModel from "../models/ChatroomModel";
import ChatroomModel from "../models/RoomModel";
import jwt from "jsonwebtoken";

class roomController {
  static async createChatroom(req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ error: "Missing authorization token" });
      return;
    }

    try {
      const roomId = await CreateChatroomModel.createChatroom(token);
      return roomId;
    } catch (error) {
      res.status(401).json({ error: error });
    }
  }

  static async deleteRoom(req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const { roomId } = req.query as any;
    const secret = process.env.SECRET_KEY as any;

    if (!token) {
      res.status(401).json({ error: "Missing authorization token" });
      return;
    }

    try {
      const decodedToken = jwt.verify(token, secret);
      if (decodedToken) {
        const deletRoom = await ChatroomModel.deleteRoom(roomId);
        return { decodedToken, deletRoom };
      } else {
        return null;
      }
    } catch (error) {
      res.status(401).json({ error: error });
    }
  }
}

export default roomController;
