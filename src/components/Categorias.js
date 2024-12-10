import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ nombre: '' });

  // Obtener datos al cargar el componente
  useEffect(() => {
    axios.get('http://localhost:5000/categorias').then((res) => setCategorias(res.data));
  }, []);

  // Crear una nueva categoría
  const handleSubmit = () => {
    axios.post('http://localhost:5000/categorias', formData).then((res) => {
      setCategorias([...categorias, res.data]);
      setShow(false);
    });
  };

  return (
    <div>
      <h1>Categorías</h1>
      <Button onClick={() => setShow(true)}>Agregar Categoría</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td>{categoria.id_categoria}</td>
              <td>{categoria.nombre}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la categoría"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Categorias;
