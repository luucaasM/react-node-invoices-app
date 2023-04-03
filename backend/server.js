import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./database.js";
const app = express();

// Midddlewares
app.use(express.json());
app.use(authRoutes);

//Conectar db
connectDB();

app.listen(3000, () => console.log("Server escuchando en puerto 3000"));
