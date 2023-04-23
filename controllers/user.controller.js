const { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, editarUsuario, disableUsuario, eliminarUsuario } = require('../services/user.service');

const getUsers = async (req, res) => {
    try {
        const resp = await obtenerUsuarios();
        console.log(resp)
        res.status(200).json(resp);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const getUserById = async () => {
    try {

    } catch (error) {

    }
};

const createUser = async (req, res) => {
    try {
        const userData = req.body
        const resp = await crearUsuario(userData)
        res.status(200).json(resp)
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const editUser = async () => {
    try {

    } catch (error) {

    }
};

const disableUser = async () => {
    try {

    } catch (error) {

    }
};

const deleteUser = async () => {
    try {

    } catch (error) {

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
