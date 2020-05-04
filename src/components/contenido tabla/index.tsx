import React from 'react';
import { Usuario } from '../../data/usuario';

export const Contenido = ({ usuarios }: any) =>
  usuarios.map((usuario: Usuario) => (
    <tr key={usuario.id}>
      <td>{usuario.name}</td>
      <td>{usuario.email}</td>
      <td>{usuario.website}</td>
    </tr>
  ));
