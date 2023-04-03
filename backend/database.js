// Codigo de la base de datos
import mongoose from "mongoose";
import dotenv from "dotenv";

// Para configurar las variables de entorno
dotenv.config()


export async function connectDB() {
  try {
    //Process.env llama a las variables de entorno del sistema
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conexion exitosa", db.connection.name)
  } catch (error) {
    console.log(error);
  }
}
