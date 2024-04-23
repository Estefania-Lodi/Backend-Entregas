const fs = require('fs');

class CartManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo;
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            if (data.trim() !== '') {
                const parsedData = JSON.parse(data);
                if (Array.isArray(parsedData)) {
                    this.carts = parsedData;
                } else {
                    console.error("Los datos cargados no son un array válido.");
                }
            }
        } catch (error) {
            console.error("Error al cargar los carritos:", error.message);
        }
    }

    async createCart(newCart) {
        try {
            const newId = this.generateCartId();
            const cart = {
                id: newId,
                ...newCart,
                status: true
            };
            this.carts.push(cart);
            await this.saveCartsToFile();
            return cart;
        } catch (error) {
            console.error('Error al crear carrito:', error);
            throw error;
        }
    }

    async getCartById(cid) {
        try {
            const cart = this.carts.find(cart => cart.id == cid);
            return cart ? cart : null;
        } catch (error) {
            console.error('Error al obtener el carrito por ID:', error);
            return null;
        }
    }

    async addProductToCart(cid, pid, quantity) {
        try {
            const cartIndex = this.carts.findIndex(cart => cart.id == cid);
            if (cartIndex !== -1) {
                this.carts[cartIndex].products.push({ product: pid, quantity });
                await this.saveCartsToFile();
                return this.carts[cartIndex];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }

    async saveCartsToFile() {
        try {
            const data = JSON.stringify(this.carts, null, 2);
            fs.writeFileSync(this.path, data);
        } catch (error) {
            console.error('Error al guardar carritos en archivo:', error);
            throw error;
        }
    }

    generateCartId() {
        return Date.now().toString();
    }
}

module.exports = CartManager;