const { Schema, model } = require('mongoose');

const userSchema = Schema({
    email: String,
    password: String,
    disable: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
});

module.exports = model('vestire-user', userSchema);