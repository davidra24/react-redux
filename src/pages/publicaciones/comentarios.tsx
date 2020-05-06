import React from 'react';
import { connect } from 'react-redux';
import { Loading } from '../../components/cargando';
import { Comentarios } from '../../data/publicacion';

interface props {
  comentarios: Comentarios[];
}

const Comentario = (props: props) => {
  if (!props.comentarios) {
    return <Loading />;
  }
  return (
    <ul>
      {props.comentarios.map((comentario: any) => (
        <li>
          <b>
            <u>{comentario.email}</u>
          </b>
          <br />
          {comentario.body}
        </li>
      ))}
    </ul>
  );
};

const mapSateToProps = ({ publicacionesReducer }: any) => publicacionesReducer;

export default connect(mapSateToProps)(Comentario);
