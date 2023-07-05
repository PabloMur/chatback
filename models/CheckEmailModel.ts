import { firestoreDB } from "../lib/firestoreConn";

class CheckEmailModel {
  static async checkEmail(email: string) {
    try {
      const querySnapshot = await firestoreDB
        .collection("auth")
        .where("email", "==", email)
        .get();

      const exists = !querySnapshot.empty;
      return exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  }
}

export default CheckEmailModel;
