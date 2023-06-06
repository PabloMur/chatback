// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { realtimeDB } from "../../lib/firestoreConn";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const db = realtimeDB;

  // Escribir datos en un nodo específico
  const writeData = async () => {
    try {
      const ref = db.ref("rooms/fourth");
      await ref.set({
        key1: "valor1",
        key2: "valor2",
      });
      console.log("Datos escritos correctamente.");
    } catch (error) {
      console.error("Error al escribir los datos:", error);
    }
  };

  // Llamar a las funciones
  writeData();

  res.status(200).json({ name: "John Doe" });
}
