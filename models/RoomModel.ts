import { firestoreDB } from "../lib/firestoreConn";
class ChatroomModel {
  static async deleteRoom(token: string, roomId: string) {
    try {
      const docRef = await firestoreDB.collection("rooms").doc(roomId).delete();
      return docRef;
    } catch (error) {
      console.error("Error deleting room:", error);
      return false;
    }
  }
}

export default ChatroomModel;
