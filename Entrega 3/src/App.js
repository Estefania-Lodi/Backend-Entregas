const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

const productManager = new ProductManager('../productos.json');

app.get('/productos', async (req, res) => {
    try {
        const limite = req.query.limite;
        const productos = await productManager.getProducts(limite);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/productos/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const producto = await productManager.getProductById(idProducto);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(port, () => {
    console.log(`El servidor está en ejecución en el puerto ${port}`);
});
