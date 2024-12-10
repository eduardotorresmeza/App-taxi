const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taxi_app',
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conexión exitosa a la base de datos.');
});

// **RUTAS CRUD**

// --- Rutas para "Usuarios" ---
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/usuarios', (req, res) => {
  const { nombre, email, telefono } = req.body;
  const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, telefono], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, nombre, email, telefono });
  });
});

app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;
  const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id_usuario = ?';
  db.query(query, [nombre, email, telefono, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

// --- Rutas para "Taxis" ---
app.get('/taxis', (req, res) => {
  db.query('SELECT * FROM taxis', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/taxis', (req, res) => {
  const { placa, marca, estado } = req.body;
  const query = 'INSERT INTO taxis (placa, marca, estado) VALUES (?, ?, ?)';
  db.query(query, [placa, marca, estado], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, placa, marca, estado });
  });
});

app.put('/taxis/:id', (req, res) => {
  const { id } = req.params;
  const { placa, marca, estado } = req.body;
  const query = 'UPDATE taxis SET placa = ?, marca = ?, estado = ? WHERE id_taxi = ?';
  db.query(query, [placa, marca, estado, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Taxi actualizado correctamente' });
  });
});

app.delete('/taxis/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM taxis WHERE id_taxi = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Taxi eliminado correctamente' });
  });
});

// --- Rutas para "Categorías" ---
app.get('/categorias', (req, res) => {
  db.query('SELECT * FROM categorias', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/categorias', (req, res) => {
  const { nombre } = req.body;
  const query = 'INSERT INTO categorias (nombre) VALUES (?)';
  db.query(query, [nombre], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, nombre });
  });
});

app.put('/categorias/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const query = 'UPDATE categorias SET nombre = ? WHERE id_categoria = ?';
  db.query(query, [nombre, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Categoría actualizada correctamente' });
  });
});

app.delete('/categorias/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM categorias WHERE id_categoria = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Categoría eliminada correctamente' });
  });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
