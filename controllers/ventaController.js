
const Venta = require('../models/ventaModel'); 
const AsociacionVentaProducto = require('../models/AsociacionVentaProductoModel'); 
const Prenda = require('../models/prendaModel'); 
const Vendedor = require('../models/vendedorModel');
const Boleta = require('../models/boletaModel');
const User = require('../models/clienteModel');

exports.crearVentaConProductos = async (req, res) => {
  try {
	// BUSCAR EL RUT DEL VENDEDOR A TRAVES DE SU ID
	const { vendedorId,userId, idsPrendas} = req.body;
	let { fecha } = req.body;
	const vendedor = await Vendedor.findById(vendedorId);
	const userData = await User.findById(userId);
	
	if(!vendedor){
		return res.status(404).json({
			status: 'fail',
			message: 'Vendedor no encontrado'
		});
	}else{
		run = vendedor.run;
	};

	if(!fecha){
		fecha = new Date().toISOString();
	}else{
		fecha = new Date(fecha).toISOString();
	}
	;

	let monto_final = 0;

	// Calcular el monto total sumando el valor de cada prenda
	const prendas = await Promise.all(idsPrendas.map(id => Prenda.findById(id)));
	await Promise.all(prendas.map(prenda => {
	  if (!prenda) throw new Error('Una o más prendas no encontradas');
	  monto_final += prenda.valor;
	  return Prenda.findByIdAndUpdate(prenda._id, { $inc: { stock: -1 } });
	}));

	// Crear la venta
	const nuevaVenta = await Venta.create({
	  fecha: fecha,
	  monto_final,
	  userId,
	  run_vendedor:run
	});

	// Crear las asociaciones con las prendas
	await Promise.all(idsPrendas.map(idPrenda => 
	  AsociacionVentaProducto.create({
		ventaId: nuevaVenta._id,
		idPrenda
	  })
	));
	try {
		await Boleta.create({
		  fecha: fecha,
		  runVendedor: run,
		  productos: idsPrendas,
		  nombre_cliente: userData.name,
		  total: monto_final,
		  valoresprendas: prendas.map(prenda => prenda.valor)
		});
	  } catch (error) {
		console.error("Error processing venta:", error);
		res.status(500).send("Internal Server Error: " + error.message);
	  }


	// Devolver respuesta exitosa
	res.status(201).json({
	  status: 'success',
	  message: 'Venta y asociaciones creadas con éxito',
	  data:{
      ventaId: nuevaVenta._id,
      monto_final,
	  run_vendedor:run,
	  fecha:fecha,
	  boleta:"Boleta creada con exito"
    }
	});
  } catch (error) {
	res.status(500).json({
	  status: 'error',
	  message: 'Error al crear la venta y las asociaciones',

	});
  }
};

exports.obtenerVentas = async (req, res) => {
  
	try {
	const ventas = await Venta.find();
	res.status(200).json({
	  status: 'success',
	  data: ventas
	});
  } catch (error) {
	res.status(500).json({
	  status: 'error',
	  message: 'Error al obtener las ventas',
	  error: error.message
	});
  }
}

exports.BuscarVentaPorFechas = async (req, res) => {
	  
	try {
	const { fechaInicio, fechaFin } = req.body;
	const ventas = await Venta.find({
	  fecha: {
		$gte: new Date(fechaInicio),
		$lte: new Date(fechaFin)
	  }
	});
	res.status(200).json({
	  status: 'success',
	  results: ventas.length,
	  data: ventas
	});
  } catch (error) {
	res.status(500).json({
	  status: 'error',
	  message: 'Error al obtener las ventas',
	  error: error.message
	});
  }
};