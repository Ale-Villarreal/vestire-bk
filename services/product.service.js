const Product= require('../models/product.model');

const obtenerProductos= async()=>{};
const obtenerProductoPorId= async()=>{};

const crearProducto= async(artic)=>{
const newArtic= new Product(artic)
return await newArtic.save()
};

const editarProducto= async()=>{};
const disableProducto= async()=>{};
const eliminarProdcucto= async()=>{};

module.exports= {
   obtenerProductos,
   obtenerProductoPorId,
   crearProducto,
   editarProducto,
   disableProducto,
   eliminarProdcucto
};
