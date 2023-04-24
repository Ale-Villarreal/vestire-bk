

const User = require('../models/user.model');

const obtenerUsuarios = async () => {
    return await User.find({});
};

const obtenerUsuarioPorId = (id) => {
    return User.findById(id)
};

const crearUsuario = async (user) => {
    const newUser = new User(user)
    return await newUser.save()
};

const editarUsuario = (id, userData) => {
    return User.findByIdAndUpdate(id, userData);
};

const eliminarUsuario = (id) => {
    return User.findByIdAndDelete(id);
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
};
