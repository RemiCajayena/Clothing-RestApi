const mongoose=require ('mongoose');

const boletaSchema = new mongoose.Schema({
        

        fecha: {
            type:Date,
            required: [true, 'La boleta debe tener una fecha'],
            trim:true
            },
        total: {
            type:Number,
            required: [true, 'La boleta debe tener un total'],
            trim:true
            },
        productos: [{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Producto'
        }],
        runVendedor:{
            type:String,
            required: [true, 'La boleta debe tener un run de vendedor'],
            ref:'Vendedor'
        },
        nombre_cliente:{
            type:String,
            required: [true, 'La boleta debe tener un nombre de cliente'],
            trim:true
        },
        valoresprendas:[{
            type:Number,
            required: [true, 'La boleta debe tener valores de prendas'],
            }]
});

const Boleta = mongoose.model('Boleta', boletaSchema);
module.exports = Boleta;