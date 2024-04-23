const express = require('express');
const CartManager = require('./CartManager');

const cartManager = new CartManager('../carrito.json');
const cartRouter = express.Router();

cartRouter.post('/', async (req, res) => {
    try {
        const newCart = req.body;
        const cart = await cartManager.createCart(newCart);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

cartRouter.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getCartById(cid);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity || 1;
        const cart = await cartManager.addProductToCart(cid, pid, quantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = { cartRouter };