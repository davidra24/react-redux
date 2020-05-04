import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Menu } from '../components/menu';
import Usuarios from './usuarios';

const Tareas = () => <div>Tareas</div>;

const App = () => (
  <BrowserRouter>
    <Menu></Menu>
    <div className='margen'>
      <Route exact path='/' component={Usuarios} />
      <Route exact path='/tareas' component={Tareas} />
    </div>
  </BrowserRouter>
);

export default App;
