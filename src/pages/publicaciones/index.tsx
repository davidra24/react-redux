import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Usuario } from '../../data/usuario';
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';
import { Loading } from '../../components/cargando';
import { Publicacion } from '../../data/publicacion';
import { Error } from '../../components/error';
import Comentarios from './comentarios';

const API = 'https://jsonplaceholder.typicode.com/users';
const API_POST = 'http://jsonplaceholder.typicode.com/posts?userId=';

interface UsuariosReducer {
  usuarios: Usuario[];
  cargando: boolean;
  error: string;
}

interface PublicacionesReducer {
  publicaciones: Publicacion[];
  cargando: boolean;
  error: string;
}

interface props {
  cargaAction: Function;
  traerUsuarios: Function;
  traerPublicaciones: Function;
  traerComentarios: Function;
  traerPorUsuario: Function;
  setError: Function;
  terminarCarga: Function;
  abrirCerrar: Function;
  usuariosReducer: UsuariosReducer;
  publicacionesReducer: PublicacionesReducer;
  match: any;
}

class Publicaciones extends Component<props, any> {
  id = 0;
  constructor(props: props) {
    super(props);
    this.id = parseInt(this.props.match.params.id);
  }
  async getUsers() {
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
  }

  async getPosts(id: number) {
    this.props.cargaAction();
    await fetch(API_POST + (id + 1))
      .then((response) => response.json())
      .then((posts) => {
        this.props.traerPorUsuario(posts);
      })
      .catch((error) => {
        this.props.setError(error.message);
        this.props.terminarCarga();
      });
  }

  componentDidMount() {
    if (
      !this.props.usuariosReducer.usuarios ||
      this.props.usuariosReducer.usuarios.length === 0
    ) {
      this.getUsers();
    }
    if (
      !this.props.publicacionesReducer.publicaciones ||
      this.props.publicacionesReducer.publicaciones.length === 0 ||
      this.props.publicacionesReducer.publicaciones[0].userId !== this.id + 1
    ) {
      this.props.traerPublicaciones([]);
      this.getPosts(this.id);
    }
  }

  mostrarComentarios = (index: number) => {
    this.props.abrirCerrar(index);
    if (!this.props.publicacionesReducer.publicaciones[index].comentarios) {
      this.props.traerComentarios(index);
    }
  };

  render() {
    if (this.props.usuariosReducer.error) {
      return <Error error={this.props.usuariosReducer.error}></Error>;
    }
    if (this.props.usuariosReducer.cargando) {
      return <Loading></Loading>;
    }
    if (
      this.props.usuariosReducer.usuarios &&
      this.props.usuariosReducer.usuarios.length > 0 &&
      this.props.publicacionesReducer.publicaciones &&
      this.props.publicacionesReducer.publicaciones.length > 0
    ) {
      return (
        <div>
          <h1>
            Publicaciones de {this.props.usuariosReducer.usuarios[this.id].name}{' '}
          </h1>
          {this.props.publicacionesReducer.publicaciones.map(
            (publicacion, index) => (
              <div
                className='pub_titulo'
                key={publicacion.id}
                onClick={
                  () =>
                    this.mostrarComentarios(index) /*this.props.abrircerrar */
                }
              >
                <h3 className='center'>{publicacion.title}</h3>
                <p className='center'>{publicacion.body}</p>
                {publicacion.abierto ? (
                  <Comentarios comentarios={publicacion.comentarios} />
                ) : (
                  <div />
                )}
              </div>
            )
          )}
        </div>
      );
    }
    return <Loading></Loading>;
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }: any) => {
  return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = { ...usuariosActions, ...publicacionesActions };

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
