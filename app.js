const bodyParser= require ('body-parser');
const express = require('express');
const morgan = require('morgan');

const prendaRouter = require('./routes/prendaRoutes');
const userRouter = require('./routes/userRoutes');
const ventaRouter = require('./routes/ventaRoutes');
const temporadaRouter = require('./routes/temporadaRoutes');
const vendedoresRouter = require('./routes/vendedorRoutes');
const boletaRouter = require('./routes/boletaRoutes');
const harryRouter = require('./routes/harryRoutes');
const app = express();


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());




app.use('/api/v1/prendas', prendaRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/venta',ventaRouter);
app.use('/api/v1/temporada',temporadaRouter);
app.use('/api/v1/vendedores',vendedoresRouter);
app.use('/api/v1/boleta',boletaRouter);
app.use('/api/v1/harry',harryRouter);


module.exports = app;
