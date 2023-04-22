const {Schema, model}= require('mongoose');


const userSchema= Schema({
    name: String,
    lastName: String,
    email: String,
    password:String,
    age: Number,
    disable: {type: Boolean, default: false},
    admin: {type: Boolean, default: false},
});
module.exports= model('vestire-user', userSchema)