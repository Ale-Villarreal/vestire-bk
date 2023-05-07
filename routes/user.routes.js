const { Router } = require('express')
const route = Router();
const { body, param } = require('express-validator');
const { getUsers, getUserById, createUser, editUser, disableUser, deleteUser, loginUser, isAdmin, info } = require('../controllers/user.controller');
const { emailExists } = require('../helpers/validations');
const { authMiddleware } = require('../routes/validate-token');

route.get('/get-users', getUsers);

route.post('/login',
  // debe ser un correo electrónico valido
  body('email').isEmail().withMessage("Formato de correo electrónico no valido.").not().isEmpty().withMessage("El campo email esta vacio."),
  // la contraseña debe tener al menos 5 caracteres
  body('password').isLength({ min: 5 }).withMessage("la contraseña debe tener al menos 5 caracteres."),
  loginUser);

route.get('/get-user-by-id/:id', getUserById);

route.post('/create-user',
  // debe ser un correo electrónico valido
  body('email').isEmail().withMessage("Formato de correo electrónico no valido.").not().isEmpty().withMessage("El campo email esta vacio.").custom(emailExists),
  // la contraseña debe tener al menos 5 caracteres
  body('password').isLength({ min: 5 }).withMessage("la contraseña debe tener al menos 5 caracteres."),
  createUser);

route.patch('/edit-user/:id', editUser);

route.patch('/disable-user/:id', disableUser);

route.delete('/delete-user/:id', deleteUser);

route.post('/check-user-admin', isAdmin);

route.get('/info', authMiddleware, info);

module.exports = route;