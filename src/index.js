const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taxis',
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// CRUD Conductores
app.get('/api/conductores', (req, res) => {
    db.query('SELECT * FROM conductores', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/api/conductores', (req, res) => {
    const { nombre, telefono, estado } = req.body;
    db.query('INSERT INTO conductores (nombre, telefono, estado) VALUES (?, ?, ?)', [nombre, telefono, estado], (err) => {
        if (err) throw err;
        res.send('Conductor añadido');
    });
});

app.put('/api/conductores/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, estado } = req.body;
    db.query('UPDATE conductores SET nombre = ?, telefono = ?, estado = ? WHERE id_conductor = ?', [nombre, telefono, estado, id], (err) => {
        if (err) throw err;
        res.send('Conductor actualizado');
    });
});

app.delete('/api/conductores/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM conductores WHERE id_conductor = ?', [id], (err) => {
        if (err) throw err;
        res.send('Conductor eliminado');
    });
});

// CRUD Vehiculos
app.get('/api/vehiculos', (req, res) => {
    db.query('SELECT * FROM vehiculos', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/api/vehiculos', (req, res) => {
    const { marca, modelo, placa } = req.body;
    db.query('INSERT INTO vehiculos (marca, modelo, placa) VALUES (?, ?, ?)', [marca, modelo, placa], (err) => {
        if (err) throw err;
        res.send('Vehículo añadido');
    });
});

app.put('/api/vehiculos/:id', (req, res) => {
    const { id } = req.params;
    const { marca, modelo, placa } = req.body;
    db.query('UPDATE vehiculos SET marca = ?, modelo = ?, placa = ? WHERE id_vehiculo = ?', [marca, modelo, placa, id], (err) => {
        if (err) throw err;
        res.send('Vehículo actualizado');
    });
});

app.delete('/api/vehiculos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM vehiculos WHERE id_vehiculo = ?', [id], (err) => {
        if (err) throw err;
        res.send('Vehículo eliminado');
    });
});

// CRUD Usuarios
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/api/usuarios', (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    db.query('INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)', [nombre, correo, contraseña], (err) => {
        if (err) throw err;
        res.send('Usuario añadido');
    });
});

app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña } = req.body;
    db.query('UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ? WHERE id_usuario = ?', [nombre, correo, contraseña, id], (err) => {
        if (err) throw err;
        res.send('Usuario actualizado');
    });
});

app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], (err) => {
        if (err) throw err;
        res.send('Usuario eliminado');
    });
});

// CRUD Categorías
app.get('/api/categorias', (req, res) => {
    db.query('SELECT * FROM categorias', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/api/categorias', (req, res) => {
    const { nombre, descripcion } = req.body;
    db.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err) => {
        if (err) throw err;
        res.send('Categoría añadida');
    });
});

app.put('/api/categorias/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    db.query('UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?', [nombre, descripcion, id], (err) => {
        if (err) throw err;
        res.send('Categoría actualizada');
    });
});

app.delete('/api/categorias/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categorias WHERE id_categoria = ?', [id], (err) => {
        if (err) throw err;
        res.send('Categoría eliminada');
    });
});

// CRUD Viajes
app.get('/api/viajes', (req, res) => {
    db.query('SELECT * FROM viajes', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/api/viajes', (req, res) => {
    const { origen, destino, fecha, conductor, pasajero } = req.body;
    db.query('INSERT INTO viajes (origen, destino, fecha, conductor, pasajero) VALUES (?, ?, ?, ?, ?)', [origen, destino, fecha, conductor, pasajero], (err) => {
        if (err) throw err;
        res.send('Viaje añadido');
    });
});

app.put('/api/viajes/:id', (req, res) => {
    const { id } = req.params;
    const { origen, destino, fecha, conductor, pasajero } = req.body;
    db.query('UPDATE viajes SET origen = ?, destino = ?, fecha = ?, conductor = ?, pasajero = ? WHERE id_viaje = ?', [origen, destino, fecha, conductor, pasajero, id], (err) => {
        if (err) throw err;
        res.send('Viaje actualizado');
    });
});

app.delete('/api/viajes/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM viajes WHERE id_viaje = ?', [id], (err) => {
        if (err) throw err;
        res.send('Viaje eliminado');
    });
});

// Inicializar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
