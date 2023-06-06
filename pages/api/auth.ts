import type { NextApiRequest, NextApiResponse } from "next";
import { firestoreDB } from "../../lib/firestoreConn";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Hash de la contraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo documento en la colección "auth"
    const docRef = firestoreDB.collection("auth").doc();
    await docRef.set({
      email,
      password: hashedPassword,
    });

    // Generar el token JWT utilizando la información del documento
    //const token = jwt.sign({ email, password: hashedPassword }, "SECRET_KEY");

    res.status(200).json({ authCreated: true });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
