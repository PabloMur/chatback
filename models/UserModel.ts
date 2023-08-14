import { firestoreDB } from "../lib/firestoreConn";
class UserModel {
  private email: string;
  private name: string;
  private profileImageUrl: string;

  constructor(email: string, name: string, profileImageUrl: string) {
    this.email = email;
    this.name = name;
    this.profileImageUrl = profileImageUrl;
  }

  // Getters and Setters
  getEmail() {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getProfileImageUrl() {
    return this.profileImageUrl;
  }

  setProfileImageUrl(profileImageUrl: string) {
    this.profileImageUrl = profileImageUrl;
  }
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
}

export { UserModel };
