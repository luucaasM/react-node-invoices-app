import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";

dotenv.config();

export const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({
      message: "Usuario y contraseña son requeridos",
    });
  }

  // Buscamos si el usuario existe en la DB.
  // .exec() devuelve una promesa que se resuelve con los resultados de la consulta.
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    return res.send("Usuario no encontrado");
  }
  console.log(foundUser.refreshToken);
  // Contraseña
  const match = await bcrypt.compare(pwd, foundUser.pwd);
  if (match) {
    // Se crea un JWT
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "60s" }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );
    // Se guarda la refreshToken en DB para control cruzado
    foundUser.refreshToken.push(refreshToken);
    await foundUser.save();
    //httpOnly para que no pueda ser leido por JS. Max age es igual a 1 dia
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ success: `Usuario ${user.use} está logeado` });
  } else {
    res.send("Desautorizado");
  }
};
