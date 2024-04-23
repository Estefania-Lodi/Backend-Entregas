const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const ProductRouter = require('./routes/ProductRouter');
const CartRouter = require('./routes/CartRouter');

const app = express();
const port = 8080;

let connectedClients = 0;
let productos = [];
let wasInRealTimeProducts = false;

app.engine('handlebars', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(err);
        const template = handlebars.compile(content.toString());
        return callback(null, template(options));
    });
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);
app.use(express.static('public'));

function cargarProductos() {
    fs.readFile(path.join(__dirname, 'data', 'productos.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo productos.json:', err);
            return;
        }
        productos = JSON.parse(data);
    });
}

cargarProductos();

io.on('connection', (socket) => {
    connectedClients++;

    socket.on('createProduct', (product) => {
        io.emit('productCreated', product);
        productos.push(product);
        io.emit('updateHome', productos);
    });
    
    socket.on('deleteProduct', (productId) => io.emit('productDeleted', productId));
    
    socket.on('disconnect', () => {
        connectedClients--;
        if (wasInRealTimeProducts) {
            console.log('Cliente desconectado');
            wasInRealTimeProducts = false;
        }
    });
});

app.get('/home', (req, res) => {
    if (wasInRealTimeProducts) {
        console.log('Cliente conectado');
        wasInRealTimeProducts = false;
    }
    res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
    console.log('Cliente desconectado');
    wasInRealTimeProducts = true;
    res.render('realTimeProducts');
});

app.get('/productos.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'productos.json'));
});

server.listen(port, () => console.log(`Servidor está escuchando en el puerto ${port}`));