const {Router}= require('express')
const route= Router();
const {getUsers,getUserById,createUser,editUser,disableUser,deleteUser}= require('../controllers/user.controller');

route.get('/get-users', getUsers);
route.get('/get-user-byId/:id', getUserById);
route.post('/create-user', createUser);
route.patch('/edit-user/:id', editUser);
route.patch('/disable-user/:id', disableUser);
route.delete('/delete-user/:id', deleteUser);

module.exports= route;