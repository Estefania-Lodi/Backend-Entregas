const fs = require('fs');

class ProductManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo;
        this.nextId = 1;
        this.products = [];
        this.cargarProductos();
    }

    cargarProductos() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                const ultimoProducto = this.products[this.products.length - 1];
                this.nextId = ultimoProducto.id + 1;
            }
        } catch (error) {
            console.error("Error al cargar los productos:", error.message);
        }
    }

    guardarProductos() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al guardar los productos:", error.message);
        }
    }

    agregarProducto(datosProducto) {
        const { titulo, descripcion, precio, imagen, stock } = datosProducto;
        const nuevoProducto = {
            id: this.nextId++,
            titulo,
            descripcion,
            precio,
            imagen,
            stock
        };
        this.products.push(nuevoProducto);
        this.guardarProductos();
    }

    obtenerProductos() {
        return this.products;
    }

    obtenerProductoPorId(idProducto) {
        const producto = this.products.find(producto => producto.id === idProducto);
        if (producto) {
            return producto;
        } else {
            console.log("Error: Producto no encontrado.");
            return null;
        }
    }

    actualizarProducto(idProducto, nuevosDatos) {
        const indice = this.products.findIndex(producto => producto.id === idProducto);
        if (indice !== -1) {
            this.products[indice] = { ...this.products[indice], ...nuevosDatos };
            this.guardarProductos();
        } else {
            console.log("Error: Producto no encontrado.");
        }
    }

    eliminarProducto(idProducto) {
        const indice = this.products.findIndex(producto => producto.id === idProducto);
        if (indice !== -1) {
            this.products.splice(indice, 1);
            this.guardarProductos();
        } else {
            console.log("Error: Producto no encontrado.");
        }
    }
}

const administradorProductos = new ProductManager('productos.json');

administradorProductos.agregarProducto({
    titulo: "Crema hidratante",
    descripcion: "Hidratación profunda",
    precio: 10,
    imagen: "imagen1.jpg",
    stock: 50
});

administradorProductos.agregarProducto({
    titulo: "Crema antiarrugas",
    descripcion: "Reduce arrugas",
    precio: 12,
    imagen: "imagen2.jpg",
    stock: 25
});

console.log(administradorProductos.obtenerProductos());