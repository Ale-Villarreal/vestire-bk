const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { obtenerUsuarios, obtenerUsuarioPorId, obtenerUsuarioPorEmail, crearUsuario, editarUsuario, eliminarUsuario } = require('../services/user.service');

const loginUser = async (req, res) => {
    try {

        //Encuentra los errores de validación en esta solicitud y los envuelve en un objeto con funciones útiles
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Validar si existe el usuario
        const user = await obtenerUsuarioPorEmail({ email });
        if (!user) return res.status(404).json('Usuario no encontrado.');

        // Validar el password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
        console.log(user)
        // Solicitar Token
        const token = jwt.sign({
            email: user.email,
            id: user._id,
            disable: user.disable,
            admin: user.admin
        },
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' });

        res.header('auth-token', token).json({
            error: null,
            data: { token }
        });
        // res.status(200).json("deberia entregar token");
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getUsers = async (req, res) => {
    try {
        const resp = await obtenerUsuarios();
        if (resp.length === 0) return res.status(404).json('No hay usuarios en la Base de Datos.');
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await obtenerUsuarioPorId(id);
        if (!resp) return res.status(404).json('Usuario no encontrado.');
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const resp = await obtenerUsuarioPorEmail(email);
        if (!resp) return res.status(404).json('Usuario no encontrado.');
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
        if (!resp) return res.status(404).json('Usuario no encontrado.');
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
        if (!resp) return res.status(404).json('Usuario no encontrado.');
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await eliminarUsuario(id);
        if (!resp) return res.status(404).json('Usuario no encontrado.');
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
    loginUser
};
