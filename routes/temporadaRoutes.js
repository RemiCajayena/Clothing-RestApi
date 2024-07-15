const express=require('express');
const temporadaController=require('./../controllers/temporadaController');

const router=express.Router();

router
    .route('/')
    .get(temporadaController.getTemporadaIdPorNombre) 
    .post(temporadaController.createTemporada);

router
    .route('/temporadas')
    .get(temporadaController.getAllTemporadas);

module.exports=router;