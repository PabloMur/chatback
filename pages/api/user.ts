import { NextApiRequest, NextApiResponse } from "next";
import { firestoreDB } from "../../lib/firestoreConn";
import bcrypt from "bcrypt";
import NextCors from "nextjs-cors";

type User = {
  name: string;
  email: string;
  hasCreatedRoom: boolean;
  roomsCreated: string[];
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>
) {
  await NextCors(req, res, {
    methods: ["PUT"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  if (req.method === "POST") {
    try {
      const { name, email, password, hasCreatedRoom } = req.body;

      // Verificar si el usuario ya existe en la colección "users"
      const snapshot = await firestoreDB
        .collection("users")
        .where("email", "==", email)
        .get();

      if (!snapshot.empty) {
        res.status(400).json({ error: "El usuario ya existe" });
        return;
      }

      // Crear un nuevo documento de usuario
      const newUser: User = {
        name,
        email,
        hasCreatedRoom,
        roomsCreated: [],
      };

      const userRef = await firestoreDB.collection("users").add(newUser);

      // Hash de la contraseña utilizando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear un nuevo documento en la colección "auth"
      const authRef = await firestoreDB.collection("auth").doc(userRef.id);
      await authRef.set({
        email,
        password: hashedPassword,
      });

      const createdUser = {
        ...newUser,
        id: userRef.id,
      };

      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el usuario" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
