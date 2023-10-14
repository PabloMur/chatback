import { firestoreDB } from "../lib/firestoreConn";
import { cloudinary } from "../lib/cloudinaryConn";
class UserModel {
  static async getMe(email: string) {
    try {
      const querySnapshot = await firestoreDB
        .collection("users")
        .where("email", "==", email)
        .get();

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      return null;
    }
  }
  static async updateMe(email: string, data: any) {
    try {
      const querySnapshot = await firestoreDB
        .collection("users")
        .where("email", "==", email)
        .get();

      if (!querySnapshot.empty) {
        const userRef = querySnapshot.docs[0].ref;
        const currentUserData = (await userRef.get()).data();
        const updatedData = { ...currentUserData, ...data };
        await userRef.update(updatedData);
        return updatedData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      return null;
    }
  }
  static async deleteMe(email: string) {
    try {
      const querySnapshot = await firestoreDB
        .collection("users")
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

export { UserModel };
