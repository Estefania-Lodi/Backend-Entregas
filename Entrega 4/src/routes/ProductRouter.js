const express = require('express');
const ProductManager = require('../dao/ProductManager');
const productManager = new ProductManager('../data/productos.json');
const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const limite = req.query.limite;
        const productos = await productManager.getProducts(limite);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

productRouter.get('/:pid', async (req, res) => {
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

productRouter.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const producto = await productManager.addProduct(newProduct);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

productRouter.put('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const updatedProduct = req.body;
        const producto = await productManager.updateProduct(idProducto, updatedProduct);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

productRouter.delete('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid;
        await productManager.deleteProduct(idProducto);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = productRouter;