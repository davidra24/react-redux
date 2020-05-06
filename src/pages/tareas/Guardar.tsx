import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions';
import { Loading } from '../../components/cargando';
import { Error } from '../../components/error';
import { Redirect } from 'react-router-dom';

class Guardar extends Component<any, any> {
  componentDidMount() {
    this.mounted();
  }

  mounted = () => {
    const {
      match: {
        params: { usu_id, tarea_id },
      },
      tareas,
      cambiarUsuarioId,
      cambiarTitulo,
      limpiarFormulario,
    } = this.props;

    if (usu_id && tarea_id) {
      const tarea = tareas[usu_id][tarea_id];
      cambiarUsuarioId(tarea.userId);
      cambiarTitulo(tarea.title);
    } else {
      limpiarFormulario();
    }
  };

  cambiarUsuarioId = (event: any) => {
    this.props.cambiarUsuarioId(event.target.value);
  };

  cambiarTitulo = (event: any) => {
    this.props.cambiarTitulo(event.target.value);
  };

  guardar = () => {
    const {
      usuario_id,
      titulo,
      agregar,
      match: {
        params: { usu_id, tarea_id },
      },
      editar,
      tareas,
    } = this.props;
    const nueva_tarea = { userId: usuario_id, title: titulo, completed: false };

    if (usu_id && tarea_id) {
      const tarea = tareas[usu_id][tarea_id];
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id,
      };
      editar(tarea_editada);
    } else {
      agregar(nueva_tarea);
    }
  };

  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;
    if (cargando) return true;
    if (!usuario_id || !titulo) return true;
    return false;
  };

  mostrarAccion = () => {
    const { error, cargando } = this.props;
    if (error) return <Error error={error}></Error>;
    if (cargando) return <Loading></Loading>;
  };

  render() {
    return (
      <div>
        {this.props.regresar ? <Redirect to='/tareas' /> : ''}
        <h1>Guardar Tarea</h1>
        Usuario id:{' '}
        <input
          type='number'
          value={this.props.usuario_id}
          onChange={this.cambiarUsuarioId}
        />
        <br />
        <br />
        Título:{' '}
        <input
          type='text'
          value={this.props.titulo}
          onChange={this.cambiarTitulo}
        />
        <br />
        <br />
        <button onClick={this.guardar} disabled={this.deshabilitar()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }: any) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
