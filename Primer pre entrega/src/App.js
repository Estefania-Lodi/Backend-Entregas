const express = require('express');
const { productRouter } = require('./ProductRouter');
const { cartRouter } = require('./CartRouter');

const app = express();
const port = 8080;

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(port, () => {
    console.log(`El servidor está en ejecución en el puerto ${port}`);
});