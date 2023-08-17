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
  static async deleteAuth(email: string) {
    try {
      const querySnapshot = await firestoreDB
        .collection("auth")
        .where("email", "==", email)
        .get();

      if (!querySnapshot.empty) {
        const userRef = querySnapshot.docs[0].ref;
        await userRef.delete();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  }
}

export default AuthModel;
