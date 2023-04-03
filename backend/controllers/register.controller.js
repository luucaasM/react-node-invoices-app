import bcrypt from "bcrypt";
import User from "../models/User.js";

export const handleRegister = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Usuario y contraseña son requeridos" });
  // Revisar si no hay duplicados
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict Status
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // guardar nuevo usuario
    let newUser = new User({ username: user, pwd: hashedPwd });
    try {
      await newUser.save();
      res.send({ success: `Nuevo usuario ${newUser} creado!` });
    } catch (err) {
      res.status(500).send({ error: err });
      console.log(err);
    }
  } catch (err) {
    res.status(500).json({ message: err.message }); // Server error
  }
};
