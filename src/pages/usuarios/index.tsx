import React, { Component } from 'react';
import { Contenido } from '../../components/contenido tabla';
import { AppState } from '../../data/app/AppState';

const API = 'https://jsonplaceholder.typicode.com/users';

class Usuarios extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      usuarios: [],
    };
  }

  getUsers = async () => {
    await fetch(API)
      .then((response) => response.json())
      .then((usuarios) => this.setState({ usuarios }));
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className='margen'>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>
            <Contenido usuarios={this.state.usuarios} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default Usuarios;
