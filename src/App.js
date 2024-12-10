import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usuarios from './components/Usuarios';
import Taxis from './components/Taxis';
import Categorias from './components/Categorias';
import 'bootstrap/dist/css/bootstrap.min.css'; 
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/taxis" element={<Taxis />} />
          <Route path="/categorias" element={<Categorias />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
