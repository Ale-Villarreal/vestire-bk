const { Router } = require('express')
const route = Router();
const { body } = require('express-validator');
const { getUsers, getUserById, createUser, editUser, disableUser, deleteUser } = require('../controllers/user.controller');
const { emailExists } = require('../helpers/validations');

route.get('/get-users', getUsers);

route.get('/get-user-by-id/:id', getUserById);

route.post('/create-user',
  // debe ser un correo electrónico valido
  body('email').isEmail().withMessage("Formato de correo electrónico no valido.").not().isEmpty().withMessage("El campo email esta vacio.").custom(emailExists),
  // la contraseña debe tener al menos 5 caracteres
  body('password').isLength({ min: 5 }).withMessage("la contraseña debe tener al menos 5 caracteres.")
  , createUser);

route.patch('/edit-user/:id', editUser);

route.patch('/disable-user/:id', disableUser);

route.delete('/delete-user/:id', deleteUser);

module.exports = route;