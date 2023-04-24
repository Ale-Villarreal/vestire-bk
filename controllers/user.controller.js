const { validationResult } = require('express-validator');

const { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, editarUsuario, eliminarUsuario } = require('../services/user.service');

const getUsers = async (req, res) => {
    try {
        const resp = await obtenerUsuarios();
        if (resp.length === 0) return res.status(404).json('No hay usuarios en la Base de Datos.')
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

const createUser = async (req, res) => {
    try {

        // Encuentra los errores de validación en esta solicitud y los envuelve en un objeto con funciones útiles
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userData = req.body;
        const resp = await crearUsuario(userData);
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
        console.log(resp);
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
        console.log(resp);
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
    deleteUser
};
