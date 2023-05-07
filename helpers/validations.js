const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const emailExists = async (email) => {
  const searchEmail = await User.find({ email });
  if (searchEmail.length !== 0) {
    throw new Error(`El email ${email}, ya se encuentra registrado.`);
  }
  return false
};

module.exports = {
  emailExists,
}


// /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/