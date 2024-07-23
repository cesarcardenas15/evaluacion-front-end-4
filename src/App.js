import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListarClientes from './clientes/ListarClientes';
import CrearCliente from './clientes/CrearCliente';
import EliminarCliente from './clientes/EliminarCliente';
import ActualizarCliente from './clientes/ActualizarCliente';

import ListarUsuarios from './usuarios/ListarUsuario';
import CrearUsuario from './usuarios/CrearUsuario';
import EliminarUsuario from './usuarios/EliminarUsuario';
import ActualizarUsuario from './usuarios/ActualizarUsuario';

import ListarTipoGestion from './tipo_gestion/ListarTipoGestion';
import CrearTipoGestion from './tipo_gestion/CrearTipoGestion';
import EliminarTipoGestion from './tipo_gestion/EliminarTipoGestion';
import ActualizarTipoGestion from './tipo_gestion/ActualizarTipoGestion';

import ListarResultados from './resultados/ListarResultados';
import CrearResultado from './resultados/CrearResultado';
import EliminarResultado from './resultados/EliminarResultado';
import ActualizarResultado from './resultados/ActualizarResultado';

import ListarGestion from './gestion/ListarGestion';
import CrearGestion from './gestion/CrearGestion';
import EliminarGestion from './gestion/EliminarGestion';
import ActualizarGestion from './gestion/ActualizarGestion';

import TopBar from './ui/TopBar';
import Home from './ui/Home';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <TopBar/>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/clientes' element={<ListarClientes />} />
          <Route path='/clientes/agregar' element={<CrearCliente />} />
          <Route path='/clientes/eliminar/:id' element={<EliminarCliente />} />
          <Route path='/clientes/actualizar/:id' element={<ActualizarCliente />} />

          <Route path='/usuarios' element={<ListarUsuarios />} />
          <Route path='/usuarios/agregar' element={<CrearUsuario />} />
          <Route path='/usuarios/eliminar/:id' element={<EliminarUsuario />} />
          <Route path='/usuarios/actualizar/:id' element={<ActualizarUsuario />} />

          <Route path='/tipo_gestion' element={<ListarTipoGestion />} />
          <Route path='/tipo_gestion/agregar' element={<CrearTipoGestion />} />
          <Route path='/tipo_gestion/eliminar/:id' element={<EliminarTipoGestion />} />
          <Route path='/tipo_gestion/actualizar/:id' element={<ActualizarTipoGestion />} />

          <Route path='/resultados' element={<ListarResultados />} />
          <Route path='/resultados/agregar' element={<CrearResultado />} />
          <Route path='/resultados/eliminar/:id' element={<EliminarResultado />} />
          <Route path='/resultados/actualizar/:id' element={<ActualizarResultado />} />

          <Route path='/gestion' element={<ListarGestion />} />
          <Route path='/gestion/agregar' element={<CrearGestion />} />
          <Route path='/gestion/eliminar/:id' element={<EliminarGestion />} />
          <Route path='/gestion/actualizar/:id' element={<ActualizarGestion />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
