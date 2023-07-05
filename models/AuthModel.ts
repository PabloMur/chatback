import { firestoreDB } from "../lib/firestoreConn";
import bcrypt from "bcrypt";

class AuthModel {
  static async createAuth(email: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const docRef = firestoreDB.collection("auth").doc();
      await docRef.set({
        email,
        password: hashedPassword,
      });
      return true;
    } catch (error) {
      console.error("Error creating auth:", error);
      return false;
    }
  }
}

export default AuthModel;
