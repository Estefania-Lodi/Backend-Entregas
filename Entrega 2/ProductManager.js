const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor(filename) {
    this.path = path.join(__dirname, filename);
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (err) {
      console.error('Error al cargar los productos:', err);
      this.products = [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (err) {
      console.error('Error al guardar los productos:', err);
    }
  }

  addProduct(productData) {
    try {
      const product = {
        ...productData,
        id: this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1
      };
      this.products.push(product);
      this.saveProducts();
      return product;
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      return null;
    }
  }

  getProducts() {
    setTimeout(() => {
      console.log('Buscando productos...');
      console.log(this.products);
    }, 3000);
  }

  getProductById(id) {
    try {
      const productById = this.products.find(product => product.id === id);
      return productById ? productById : "Not found";
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    try {
      const index = this.products.findIndex(product => product.id === id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedFields };
        this.saveProducts();
        return this.products[index];
      }
      return null;
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return null;
    }
  }

  deleteProduct(id) {
    try {
      const index = this.products.findIndex(product => product.id === id);
      if (index !== -1) {
        const deletedProduct = this.products.splice(index, 1);
        this.saveProducts();
        return deletedProduct[0];
      }
      return null;
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      return null;
    }
  }
}

const productManager = new ProductManager('productos.json');

productManager.addProduct({
  title: "Siega",
  description: "En un mundo perfecto, los humanos no mueren. Pero en el mundo de El Segador, los segadores son los únicos que terminan con la vida, para mantener el equilibrio.",
  price: 15,
  thumbnail: "Siega.jpg",
  stock: 100,
  author: "Neal Shusterman"
});

productManager.addProduct({
  title: "Nimbo",
  description: "Continuación de Siega, donde las reglas del mundo de los segadores están cambiando.",
  price: 18,
  thumbnail: "Nimbo.jpg",
  stock: 50,
  author: "Neal Shusterman"
});

productManager.getProducts();