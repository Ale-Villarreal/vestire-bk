const express = require('express');
const app = express();
require('dotenv/config');
require('../db-base/db.connection');
const port = process.env.PORT;
const cors = require('cors');
const morgan = require('morgan');
const userRoute = require('../routes/user.routes');
const productRoute = require('../routes/produc.routes');
const { authMiddleware } = require('../routes/validate-token');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', userRoute);
app.use('/product', productRoute);

//rutas protegidas
//app.use('/info', info);

// const user = req.userId;
// res.json(`Esto es la info confidencial solicitada por el User: ${user}`)


app.listen(port, () => {
    console.log(`Estamos escuchando en http://localhost:${port}`);
});
