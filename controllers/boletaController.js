const Boleta=require('../models/boletaModel');

exports.createBoleta = async (req, res) => {
    try{
        const { fecha,total} = req.body;

        // Crear la nueva temporada con el nombre proporcionado
        const newBoleta = await Boleta.create({fecha,total });

        res.status(201).json({
            status: 'success',
            data: {
                boleta: newBoleta
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

exports.getAllBoletas = async (req, res) => {
    try {
        const boletas = await Boleta.find();
        res.status(200).json({
            status: 'success',
            data: boletas
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.BuscarVentaPorFechas = async (req, res) => {
	  
	try {
	const { fechaInicio, fechaFin } = req.body;
	const boleta = await Boleta.find({
	  fecha: {
		$gte: new Date(fechaInicio),
		$lte: new Date(fechaFin)
	  }
	});
	res.status(200).json({
	  status: 'success',
	  results: boleta.length,
	  data: boleta
	});
  } catch (error) {
	res.status(500).json({
	  status: 'error',
	  message: 'Error al obtener las boletas',
	  error: error.message
	});
  }
};