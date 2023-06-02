const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  obtenerUsuarioPorEmail,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  usuarioEsAdmin,
  obtenerUsuarioPorNombre,
} = require("../services/user.service");

const loginUser = async (req, res) => {
  try {
    //Encuentra los errores de validación en esta solicitud y los envuelve en un objeto con funciones útiles
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Validar si existe el usuario por el email
    const user = await obtenerUsuarioPorEmail(email);
    if (!user) return res.status(404).json("Usuario o contraseña invalido.");

    // Validar el password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Usuario o contraseña invalido." });

    // Validar el userName
    if (user.username !== username)
      return res.status(400).json({ error: "Usuario o contraseña invalido." });

    // Generar y enviar el Token
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        id: user._id,
        disable: user.disable,
        admin: user.admin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
    // res.status(200).json("deberia entregar token");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const resp = await obtenerUsuarios();
    if (resp.length === 0)
      return res.status(404).json("No hay usuarios en la Base de Datos.");
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.userId;
    const resp = await obtenerUsuarioPorId(id);
    if (!resp) return res.status(404).json("Usuario no encontrado no hay usuario.");
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const resp = await obtenerUsuarioPorEmail(email);
    if (!resp) return res.status(404).json("Usuario no encontrado.");
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserByUserName = async (req, res) => {
  try {
    const { username } = req.params;
    const resp = await obtenerUsuarioPorNombre(username);
    if (!resp) return res.status(404).json("Usuario no encontrado.");
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    //Encuentra los errores de validación en esta solicitud y los envuelve en un objeto con funciones útiles
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;
    const { password } = userData;
    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound);
    const pswHash = bcrypt.hashSync(password, salt);
    userData.password = pswHash;
    const resp = await crearUsuario(userData);
    //res.status(201).json(pswHash);
    res.status(201).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const resp = await editarUsuario(id, userData);
    if (!resp) return res.status(404).json("Usuario no encontrado.");
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const disableUser = async (req, res) => {
  try {
    const { id } = req.params;
    const disable = true;
    const resp = await editarUsuario(id, { disable });
    console.log(resp);
    if (!resp) return res.status(404).json("Usuario no encontrado.");
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await eliminarUsuario(id);
    if (!resp) return res.status(404).json("Usuario no encontrado.");
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const isAdmin = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Debe de proporcionar un Token en la solicitud." });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const resp = await usuarioEsAdmin(decodedToken.id);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const info = async (req, res) => {
  try {
    const resp = await obtenerUsuarioPorId(req.userId);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUser,
  disableUser,
  deleteUser,
  loginUser,
  isAdmin,
  info,
  getUserByEmail,
  getUserByUserName,
};
