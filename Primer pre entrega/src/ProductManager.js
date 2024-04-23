const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts(limit) {
        try {
            const rawData = fs.readFileSync(this.filePath);
            const products = JSON.parse(rawData);
            return limit ? products.slice(0, limit) : products;
        } catch (error) {
            console.error('Error al cargar los productos:', error.message);
            return [];
        }
    }

    async getProductById(productId) {
        try {
            const rawData = fs.readFileSync(this.filePath);
            const products = JSON.parse(rawData);
            return products.find(product => product.id === productId);
        } catch (error) {
            console.error('Error al obtener producto por ID:', error.message);
            return null;
        }
    }

    async addProduct(newProduct) {
        try {
            const rawData = fs.readFileSync(this.filePath);
            const products = JSON.parse(rawData);
            const id = Date.now().toString();
            const product = { id, ...newProduct };
            products.push(product);
            fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
            return product;
        } catch (error) {
            console.error('Error al agregar producto:', error.message);
            throw error;
        }
    }

    async updateProduct(productId, updatedFields) {
        try {
            const rawData = fs.readFileSync(this.filePath);
            let products = JSON.parse(rawData);
            const productIndex = products.findIndex(product => product.id === productId);
            if (productIndex !== -1) {
                products[productIndex] = { ...products[productIndex], ...updatedFields };
                fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
                return products[productIndex];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al actualizar producto:', error.message);
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const rawData = fs.readFileSync(this.filePath);
            let products = JSON.parse(rawData);
            const productsWithoutDeleted = products.filter(product => product.id !== productId);
            fs.writeFileSync(this.filePath, JSON.stringify(productsWithoutDeleted, null, 2));
        } catch (error) {
            console.error('Error al eliminar producto:', error.message);
            throw error;
        }
    }
}

module.exports = ProductManager;