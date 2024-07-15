const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    },

    password: {
        type: String,
        required: true
    },
    runcli:{
        type: String,
        required: true
    }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;