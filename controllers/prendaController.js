const Prenda = require('../models/prendaModel');
const APIFeatures = require('../utils/apiFeatures');
const Temporada = require ('../models/temporadaModel')



//Get Masivo
exports.getAllPrendas = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Prenda.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const prendas = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: prendas.length,
      data: {
        prendas
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

//Get por ID
exports.getPrenda = async (req, res) => {
  
  try {
    const prenda = await Prenda.findById(req.params.id);


    res.status(200).json({
      status: 'success',
      data: {
        prenda
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};


exports.createPrenda = async (req, res) => {
  try {

    const prendasData = req.body;
    const prendasCreadas = [];

    for (const dataPrenda of prendasData) {
      const temporadaName = dataPrenda.nombre_temporada;
      const temporada = await Temporada.findOne({ nombre_temporada: temporadaName });

      if (!temporada) {
       
        console.error('Temporada no encontrada para', temporadaName);
        continue;

      }

      const nuevaPrenda = await Prenda.create({
        ...dataPrenda,
        Idtemporada: temporada._id 
      });

      prendasCreadas.push(nuevaPrenda);
    }

    
    res.status(201).json({
      status: 'success',
      data: {
        prendas: prendasCreadas
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al crear las prendas'
    });
  }
};


exports.updatePrenda = async (req, res) => {
  try {
    const prenda = await Prenda.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  

    res.status(200).json({
      status: 'success',
      data: {
        prenda
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deletePrenda = async (req, res) => {
  try {
    await Prenda.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};



exports.cambioePrenda = async (req, res) => {
  try {
    // Paso 1: Buscar el documento por ID.
    const prenda = await Prenda.findById(req.params.id);

    if (!prenda) {
      return res.status(404).json({
        status: 'fail',
        message: 'No se encontró la prenda con ese ID'
      });
    }

    // Paso 2: Invertir el valor del estado.
    const nuevoEstado = !prenda.estado;

    // Paso 3: Actualizar el documento con el nuevo valor del estado.
    const prendaActualizada = await Prenda.findByIdAndUpdate(req.params.id, 
      { estado: nuevoEstado },
      { new: true } // Devuelve el documento modificado.
    );

    res.status(200).json({
      status: 'success',
      data: {
        prenda: prendaActualizada
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error al cambiar el estado de la prenda'
    });
  }
};
