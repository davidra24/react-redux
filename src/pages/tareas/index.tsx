import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions';
import { Loading } from '../../components/cargando';
import { Error } from '../../components/error';
import { Link } from 'react-router-dom';

class Tareas extends Component<any, any> {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTareas();
    }
  }

  componentDidUpdate() {
    const { tareas, cargando, traerTareas } = this.props;

    if (!Object.keys(tareas).length && !cargando) {
      traerTareas();
    }
  }

  ponerTareas = (usu_id: any) => {
    const { tareas, cambioCheck, eliminar } = this.props;
    const por_usuario = {
      ...tareas[usu_id],
    };
    return Object.keys(por_usuario).map((tarea_id) => (
      <div key={tarea_id}>
        <input
          type='checkbox'
          defaultChecked={por_usuario[tarea_id].completed}
          onChange={() => cambioCheck(usu_id, tarea_id)}
        />
        {por_usuario[tarea_id].title}
        <Link className='m_left' to={`/tareas/guardar/${usu_id}/${tarea_id}`}>
          Editar
        </Link>
        <button className='m_left' onClick={() => eliminar(tarea_id)}>
          Eliminar
        </button>
      </div>
    ));
  };

  mostrarContenido = () => {
    const { tareas, cargando, error } = this.props;

    if (cargando) return <Loading></Loading>;

    if (error) return <Error error={error}></Error>;

    return Object.keys(tareas).map((usu_id) => (
      <div key={usu_id}>
        <h2>Usuario: {usu_id}</h2>
        <div className='contenedor_tareas'>{this.ponerTareas(usu_id)}</div>
      </div>
    ));
  };

  render() {
    return (
      <Fragment>
        <Link to='/tareas/guardar'> Agregar</Link>
        <div>{this.mostrarContenido()}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ tareasReducer }: any) => tareasReducer;

const mapDispatchToProps = { ...tareasActions };

export default connect(mapStateToProps, mapDispatchToProps)(Tareas);
