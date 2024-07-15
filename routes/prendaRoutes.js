const express = require('express');
const prendaController = require('./../controllers/prendaController');

const router = express.Router();


router
  .route('/')
  .get(prendaController.getAllPrendas) //Get Masivo
  .post(prendaController.createPrenda); // Generar Prenda

router
  .route('/:id')
  .get(prendaController.getPrenda) //Get Por ID
  .patch(prendaController.updatePrenda) //Actualizar prenda
  .delete(prendaController.deletePrenda) //Borrar una Prenda
  .put(prendaController.cambioePrenda); //Desactivar o activar prenda

module.exports = router;
