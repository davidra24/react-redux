import React, { Component } from 'react';
import { Contenido } from '../../components/contenido tabla';
import { AppState } from '../../data/app/AppState';
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';
import { Usuario } from '../../data/usuario';
import { Loading } from '../../components/cargando';
import { Error } from '../../components/error';
import Tabla from './tabla';

const API = 'https://jsonplaceholder.typicode.com/users';

interface AppProps {
  usuarios: Usuario[];
  cargando: boolean;
  traerUsuarios: Function;
  cargaAction: Function;
  terminarCarga: Function;
  setError: Function;
  error: string;
}

class Usuarios extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      usuarios: [],
    };
  }

  traerUsuarios = async () => {
    this.props.cargaAction();
    await fetch(API)
      .then((response) => response.json())
      .then((usuarios) => {
        this.props.traerUsuarios(usuarios);
      })
      .catch((error) => {
        this.props.setError(error.message);
        this.props.terminarCarga();
      });
  };

  componentDidMount() {
    if (!this.props.usuarios || this.props.usuarios.length === 0) {
      this.traerUsuarios();
    }
  }

  render() {
    if (this.props.cargando) {
      return <Loading />;
    }
    if (this.props.error) {
      return <Error error={this.props.error} />;
    }
    return (
      <div>
        <h1 className='center'>Usuarios</h1>
        <Tabla />
      </div>
    );
  }
}

const mapStateToProps = (reducers: any) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
