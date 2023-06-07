import type { NextApiRequest, NextApiResponse } from "next";
import { send } from "micro";
import NextCors from "nextjs-cors";
import { firestoreDB } from "../../lib/firestoreConn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["POST"],
      origin: "*",
      optionsSuccessStatus: 200,
    });

    if (req.method !== "POST") {
      throw new Error("Method Not Allowed");
    }
    const { email } = req.body;

    // Buscar el documento en la colección "auth" con el correo electrónico dado
    const querySnapshot = await firestoreDB
      .collection("auth")
      .where("email", "==", email)
      .get();

    const exists = !querySnapshot.empty;

    return send(res, 200, { exists });
  } catch (error) {
    console.error(error);
    return send(res, 400, { exists: false });
  }
}
