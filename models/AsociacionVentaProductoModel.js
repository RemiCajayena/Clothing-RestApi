const mongoose = require('mongoose');


const asociacionVentaProductoSchema = new mongoose.Schema({
  ventaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venta'
  },
  idPrenda: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prenda' 
  },
  cantidad: Number,
  // otros campos según sea necesario
});


const AsociacionVentaProducto = mongoose.model('AsociacionVentaProducto', asociacionVentaProductoSchema);


module.exports=AsociacionVentaProducto;