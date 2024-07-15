const mongoose = require('mongoose');
const Temporada = require('../models/temporadaModel');




exports.getTemporadaIdPorNombre = async (req, res) => {
    try {
        // Extraer el nombre de la temporada del cuerpo de la solicitud
        const { nombre_temporada } = req.body;

        // Buscar la temporada por nombre
        const temporada = await Temporada.findOne({ nombre_temporada: nombre_temporada });

        // Verificar si se encontró la temporada
        if (!temporada) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontró la temporada con el nombre proporcionado'
            });
        }

        // Devolver el ID de la temporada encontrada
        res.status(200).json({
            status: 'success',
            data: {
                id: temporada._id,
                nombre_temporada: nombre_temporada
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error al buscar la temporada: ' + err.message
        });
    }
};

exports.createTemporada = async (req, res) => {
    try{
        const { nombre_temporada } = req.body;
        const {_id}=new mongoose.Types.ObjectId()
        // Crear la nueva temporada con el nombre proporcionado
        const newTemporada = await Temporada.create({_id, nombre_temporada });

        res.status(201).json({
            status: 'success',
            data: {
                temporada: newTemporada
            }
        });
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });

    }
};

exports.getAllTemporadas = async (req, res) => {
    try {
        // Realizar la consulta para obtener todas las temporadas
        const temporadas = await Temporada.find();

        // Verificar si se encontraron temporadas
        if (temporadas.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontraron temporadas'
            });
        }

        // Devolver las temporadas encontradas
        res.status(200).json({
            status: 'success',
            results: temporadas.length,
            data: {
                temporadas
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las temporadas',
            error: error.message
        });
    }
};
