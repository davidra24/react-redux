import React from 'react';
import { connect } from 'react-redux';
import { Contenido } from '../../components/contenido tabla';

const Tabla = (props: any) => (
  <div>
    <table className='tabla'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Enlace</th>
        </tr>
      </thead>
      <tbody>
        <Contenido usuarios={props.usuarios} />
      </tbody>
    </table>
  </div>
);

const mapStateToProps = (reducers: any) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps)(Tabla);
