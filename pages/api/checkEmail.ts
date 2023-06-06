import type { NextApiRequest, NextApiResponse } from "next";
import { firestoreDB } from "../../lib/firestoreConn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;

    // Buscar el documento en la colección "auth" con el correo electrónico dado
    const querySnapshot = await firestoreDB
      .collection("auth")
      .where("email", "==", email)
      .get();

    const exists = !querySnapshot.empty;

    res.status(200).json({ exists });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
