const mongoose  = require('mongoose');

const vendedorSchema = new mongoose.Schema({
    run:{
        type:String,
        unique:true

    },
    nombre_vendedor:{
        type:String,
        required:[true, 'El vendedor debe tener un nombre'],
        trim:true
    }
    
})

const Vendedor = mongoose.model('Vendedore', vendedorSchema);

module.exports = Vendedor;
  