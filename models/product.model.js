const {Schema, model}= require('mongoose');

const producSchema= Schema({
    name: String,
    color: String,
    disable: { type: Boolean, default: false}
});
module.exports= model('vestire-product', producSchema)