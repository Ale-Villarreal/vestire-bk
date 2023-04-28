const {Schema, model}= require('mongoose');

const producSchema= Schema({
    
    destacado: Boolean,
    categoria: String,
    subCategoria: String,
    marca: String,
    resumenDescripcion: String,
    descripcion: String,
    imagen: String,
    color: String,
    precio: Number,
    cantidadPorTalle: { xs:Number, m: Number, l:Number, xl: Number,
    s:Number},
    clase: []

});
module.exports= model('vestire-product', producSchema)