const {obtenerProductos, obtenerProductoPorId, crearProducto, editarProducto, disableProducto, eliminarProdcucto}= require('../services/product.service');

const getProducts= async()=>{
    try {
        
    } catch (error) {
        
    }
};
const getProductById= async()=>{
    try {
        
    } catch (error) {
        
    }
};
const createProduct= async(req, res)=>{
    try {
        const producData= req.body
        const resp= await crearProducto(producData)
        res.status(200).json(resp)
    } catch (error) {
        res.status(500).json(error.message);    
    }
};
const editProduct= async()=>{
    try {
        
    } catch (error) {
        
    }
};
const disableProduct= async()=>{
    try {
        
    } catch (error) {
        
    }
};
const deleteProduct= async()=>{
    try {
        
    } catch (error) {
        
    }
};

module.exports={
   getProducts,
   getProductById,
   createProduct,
   disableProduct,
   editProduct,
   deleteProduct
   
};