import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = (props: any) => (
  <div>
    <nav id='menu'>
      <Link to='/'>Usuarios</Link>
      <Link to='/tareas'>Tareas</Link>
    </nav>
  </div>
);
