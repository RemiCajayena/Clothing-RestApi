const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  fecha: Date,
  monto_final: Number,
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true,"La venta debe tener un usuario"]},
  run_vendedor:{
    type: String,
    ref:'Vendedor',
    required: [true,"La venta debe tener un vendedor"]
  }  
  // otros campos según sea necesario
});

const Venta = mongoose.model('Venta', ventaSchema);

module.exports = Venta;