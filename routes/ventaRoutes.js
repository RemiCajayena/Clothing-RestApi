const express = require('express');
const ventaController = require('./../controllers/ventaController');

const router = express.Router();

router
    .route('/')
    .get(ventaController.obtenerVentas) //Obtener todas las ventas
    .post(ventaController.crearVentaConProductos); //Crear una venta con prendas
router
    .route('/informe')
    .get(ventaController.BuscarVentaPorFechas); //Buscar ventas por rango de fechas    

module.exports = router;
