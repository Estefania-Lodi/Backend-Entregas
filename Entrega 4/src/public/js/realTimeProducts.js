const socket = io();

socket.on('productCreated', () => {
    window.location.reload();
});

document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    if (id < 1) {
        document.getElementById('id-error-message').textContent = 'Debe ser un número positivo';
        return;
    } else {
        document.getElementById('id-error-message').textContent = '';
    }

    if (!/^[A-Za-z]+$/.test(titulo)) {
        document.getElementById('titulo-error-message').textContent = 'Solo letras';
        return;
    } else {
        document.getElementById('titulo-error-message').textContent = '';
    }

    if (!/^[A-Za-z]+$/.test(descripcion)) {
        document.getElementById('descripcion-error-message').textContent = 'Solo letras';
        return;
    } else {
        document.getElementById('descripcion-error-message').textContent = '';
    }

    if (precio <= 0) {
        document.getElementById('precio-error-message').textContent = 'Debe ser un número positivo mayor que 1';
        return;
    } else {
        document.getElementById('precio-error-message').textContent = '';
    }

    if (stock < 0) {
        document.getElementById('stock-error-message').textContent = 'Debe ser un número positivo';
        return;
    } else {
        document.getElementById('stock-error-message').textContent = '';
    }

    socket.emit('createProduct', { id, titulo, descripcion, precio, stock });

    document.getElementById('id').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('stock').value = '';
});
