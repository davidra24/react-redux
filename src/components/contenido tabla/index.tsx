import React from 'react';
import { Usuario } from '../../data/usuario';

export const Contenido = ({ usuarios }: any) =>
  usuarios.map((Usuario: Usuario) => (
    <tr key={Usuario.id}>
      <td>{Usuario.name}</td>
      <td>{Usuario.email}</td>
      <td>{Usuario.website}</td>
    </tr>
  ));
