const formateorun = require('../utils/utils');
const User = require('../models/clienteModel');

exports.getAllUsers = async (req, res) => {
  
	try {
    const usuarios = await User.find();
    res.status(200).json({
      status: 'success',
      data: usuarios
    });
    } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener las ventas',
      error: error.message
    });
    }
};

exports.createUser = async (req, res) => {
  try {
    const { runcli } = req.body;
    const runFormateado = formateorun(runcli);
    const user = req.body;
    user.runcli = runFormateado;


    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ runcli: runFormateado});
    if (existingUser) {
      return res.status(409).json({ // 409 Conflict podría ser más apropiado aquí
        status: 'fail',
        message: 'El usuario con el run '+runFormateado +' ya existe'
      });
    }

    // Crear el nuevo usuario si no existe
    const newUser = await User.create(user);
    res.status(201).json({
      status: 'success',
      data: {
        Usuario: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

