import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Menu } from '../components/menu';
import Usuarios from './usuarios';
import Publicaciones from './publicaciones';
import Tareas from './tareas';
import TareasGuardar from './tareas/Guardar';

const App = () => (
  <BrowserRouter>
    <Menu></Menu>
    <div className='margen'>
      <Route exact path='/' component={Usuarios} />
      <Route exact path='/tareas' component={Tareas} />
      <Route exact path='/tareas/guardar' component={TareasGuardar} />
      <Route
        exact
        path='/tareas/guardar/:usu_id/:tarea_id'
        component={TareasGuardar}
      />
      <Route exact path='/publicaciones/:id' component={Publicaciones} />
    </div>
  </BrowserRouter>
);

export default App;
