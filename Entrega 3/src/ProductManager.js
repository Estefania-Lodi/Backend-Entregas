const fs = require('fs');

class ProductManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error("Error al cargar los productos:", error.message);
        }
    }

    async getProducts(limit) {
        try {
            if (limit) {
                return this.products.slice(0, limit);
            } else {
                return this.products;
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            return null;
        }
    }

    async getProductById(idProducto) {
        try {
            const producto = this.products.find(producto => producto.id == idProducto);
            return producto ? producto : null;
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            return null;
        }
    }
}

module.exports = ProductManager;