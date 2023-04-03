import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyJWT = (req, res, next) => {
  // Se obtiene el encabezado "auth" de la solicitud del cliente utilizando req.headers["auth"]
  const authHeader = req.headers["auth"];
  if (!authHeader) return res.sendStatus(401); // Si no existe header, cliente no está autorizado.
  console.log(authHeader)
  // Divide el valor del encabezado "auth" en dos partes utilizando split(' '). 
  // primer elemento: la palabra "Bearer", que es el esquema del token JWT. segundo elemento: token JWT real.
  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN,
    // Función de devolución
    (err, decoded) => {
        if(err) return res.sendStatus(403); //Token inválido
        // Establece username codificado en el token en la prop req.user
        req.user = decoded.username;
        next();
    }
  )
};

