const express = require('express');
const vendedorController = require('./../controllers/vendedorController');

const router = express.Router();

router
    .route('/')
    .get(vendedorController.getAllVendedores) //Obtener todos los vendedores
    .post(vendedorController.createVendedor); 
    

module.exports = router;
