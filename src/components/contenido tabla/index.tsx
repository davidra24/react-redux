import React from 'react';
import { Usuario } from '../../data/usuario';
import '../../styles/eyeIcon.css';
import { Link } from 'react-router-dom';

export const Contenido = ({ usuarios }: any) =>
  usuarios.map((usuario: Usuario, index: number) => (
    <tr key={usuario.id}>
      <td>{usuario.name}</td>
      <td>{usuario.email}</td>
      <td>{usuario.website}</td>
      <td>
        <Link to={`/publicaciones/${index}`}>
          <div className='eye-solid icon'></div>
        </Link>
      </td>
    </tr>
  ));
