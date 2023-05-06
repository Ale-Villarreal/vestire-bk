const { Schema, model } = require("mongoose");

const producSchema = Schema({
  destacado: { type: Boolean, default: false },
  codigo: String,
  categoria: String,
  subCategoria: String,
  marca: String,
  resumenDescripcion: String,
  descripcion: String,
  imagen: String,
  color: String,
  precio: Number,
  cantidadPorTalle: {
    xs: Number,
    m: Number,
    l: Number,
    xl: Number,
    s: Number,
  },
  clase: [],
});

module.exports = model("vestire-product", producSchema);
