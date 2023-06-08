import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { firestoreDB } from "../../lib/firestoreConn";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      methods: ["POST"],
      origin: "*",
      optionsSuccessStatus: 200,
    });

    if (req.method !== "POST") throw new Error("Method Not Allowed");

    const { email, password } = req.body;
    const secret = process.env.SECRET_KEY as any;

    // Buscar el documento en la colección "auth" con el correo electrónico dado
    const querySnapshot = await firestoreDB
      .collection("auth")
      .where("email", "==", email)
      .get();

    if (querySnapshot.empty) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const doc = querySnapshot.docs[0];
    const savedPassword = doc.data().password;

    // Comparar la contraseña hasheada almacenada con la contraseña proporcionada
    const passwordMatch = await bcrypt.compare(password, savedPassword);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Generar el token JWT
    const token = jwt.sign({ email }, secret);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
