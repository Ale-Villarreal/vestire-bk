const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const emailExists = async (email) => {
  const searchEmail = await User.find({ email });
  if (searchEmail.length !== 0) {
    throw new Error(`El email ${email}, ya se encuentra registrado.`);
  }
  return false
};

const generateToken = (data) => {

  const token = jwt.sign(
    { data },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return token;

};

const getUserDataByToken = (authHeader) => {
  try {
    if (!authHeader) {
      console.log("Debe de proporcionar un Token en la solicitud.");
    }
    const token = authHeader.split(" ")[1];
    const { data } = jwt.verify(token, process.env.TOKEN_SECRET);
    return data;
  } catch (error) {
    console.log(error)
  }

}

const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

const generateHash = (text) => {
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  const pswHash = bcrypt.hashSync(text, salt);
  return pswHash;
}

module.exports = {
  emailExists,
  generateToken,
  generateUUID,
  getUserDataByToken,
  generateHash
}


// /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/