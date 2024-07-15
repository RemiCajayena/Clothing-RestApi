const formateorun = require('../utils/utils');
const Vendedores = require('../models/vendedorModel');



exports.createVendedor = async (req, res) => {
    try {
        const { run } = req.body;
        const runFormateado = formateorun(run);
        const { nombre_vendedor } = req.body;

        const vendedorExistente = await Vendedores.findOne({ run: runFormateado });
        if (!vendedorExistente) {
            const newVendedor = await Vendedores.create({ nombre_vendedor, run: runFormateado });
            res.status(201).json({
                status: 'success',
                data: {
                    nombre_vendedor: newVendedor.nombre_vendedor,
                    run: runFormateado,
                    id:newVendedor._id
                }
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'El vendedor con el Run : ' + runFormateado + ' ya existe'
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el vendedor'
        });
    }
};

exports.getAllVendedores = async (req, res) => {
    try {
        const vendedores = await Vendedores.find();

        // Verificar si se encontraron vendedores
        if (vendedores.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No se encontraron vendedores'
            });
        }

        // Devolver las vendedores encontradas
        res.status(200).json({
            status: 'success',
            results: vendedores.length,
            data: {
                vendedores
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los vendedores'
        });
    }};