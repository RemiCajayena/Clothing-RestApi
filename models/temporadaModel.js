const mongoose=require ('mongoose');

const temporadaSchema = new mongoose.Schema({
    
    _id:{
        type:mongoose.SchemaTypes.ObjectId
    },
    nombre_temporada: {
        type:String,
        required: [true, 'La Temporada debe tener un nombre'],
        trim:true,
        unique:true
        }
    
    
});

const Temporada = mongoose.model('Temporada', temporadaSchema);

module.exports = Temporada;