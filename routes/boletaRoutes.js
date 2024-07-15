const express = require('express');
const boletaController = require('./../controllers/boletaController');

const router = express.Router();

router
    .route('/')
    .get(boletaController.getAllBoletas)
    .post(boletaController.createBoleta)
router
    .route('/informe')
    .get(boletaController.BuscarVentaPorFechas)
module.exports = router;