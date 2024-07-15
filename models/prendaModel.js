const mongoose = require('mongoose');



const prendaSchema = new mongoose.Schema({
    nombre_prenda: {
        type:String,
        required: [true, 'La prenda debe tener un nombre'],
        trim: true,
        unique: true
        },
    stock: {
        type:Number,
        required: [true, 'La prenda debe tener un stock'],
        minlength:1,
        min:1
        },
    talla: {
        type:String,
        required: [true, 'La prenda debe tener una talla'],
        trim: true
        },
    valor: {
        type:Number,
        required: [true, 'La prenda debe tener un valor'],
        min:1000
        },
    estado:{
        type:Boolean,
        required: [true, 'La prenda debe tener un estado(V o F)'],
        default: true
        },
    Idtemporada:{
        type:mongoose.Schema.Types.ObjectId,
        required : [true, 'La prenda debe tener una temporada'],
        ref:'Temporada'
    }     
    });


  
const Prenda = mongoose.model('Prenda', prendaSchema);

module.exports = Prenda;
  