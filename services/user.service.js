const User = require('../models/user.model');

const obtenerUsuarios = async () => {
    return await User.find({});
};

const obtenerUsuarioPorId = (id) => {
    return User.findById(id);
};

const obtenerUsuarioPorEmail = (emailFind) => {
    const email = emailFind;
    return User.findOne(email);
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
    obtenerUsuarioPorEmail,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
};
