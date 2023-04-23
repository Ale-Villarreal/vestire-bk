const User = require('../models/user.model');

const obtenerUsuarios = async () => {
    return await User.find({});
};
const obtenerUsuarioPorId = () => { };

const crearUsuario = async (user) => {
    const newUser = new User(user)
    return await newUser.save()
};

const editarUsuario = () => { };
const disableUsuario = () => { };
const eliminarUsuario = () => { };

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    editarUsuario,
    disableUsuario,
    eliminarUsuario
};
