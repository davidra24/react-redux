import {
  TRAER_PUBLICACIONES,
  CARGANDO_PUBLICACIONES,
  ERROR_PUBLICACIONES,
  CARGADO_PUBLICACIONES,
  TRAER_PUBLICACION,
  TRAER_COMENTARIOS,
} from '../types/publicacionesTypes';
import { Publicacion } from '../data/publicacion';
import { Dispatch } from 'redux';

export const traerPublicaciones = (respuesta: Publicacion[]) => (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: TRAER_PUBLICACIONES,
      payload: respuesta,
    });
  } catch (error) {
    dispatch({
      type: ERROR_PUBLICACIONES,
      payload: 'Publicaciones no disponibles',
    });
  }
};

export const traerPorUsuario = (respuesta: Publicacion[]) => (
  dispatch: Dispatch
) =>
  dispatch({
    type: TRAER_PUBLICACION,
    payload: respuesta,
  });

export const cargaAction = () => (dispatch: Dispatch) => {
  dispatch({ type: CARGANDO_PUBLICACIONES });
};

export const terminarCarga = () => (dispatch: Dispatch) => {
  dispatch({ type: CARGADO_PUBLICACIONES });
};

export const abrirCerrar = (index: number) => (
  dispatch: Dispatch,
  getState: any
) => {
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[index];

  const actualizada = {
    ...seleccionada,
    abierto: !seleccionada.abierto,
  };

  publicaciones[index] = actualizada;

  const publicacionesActualizadas = [...publicaciones];

  dispatch({
    type: TRAER_PUBLICACION,
    payload: publicacionesActualizadas,
  });
};

export const setError = () => (dispatch: Dispatch) => {
  dispatch({
    type: ERROR_PUBLICACIONES,
    payload: 'Algo salió mal, intente más tarde',
  });
};

export const traerComentarios = (index: number) => async (
  dispatch: Dispatch,
  getState: Function
) => {
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[index];

  const respuesta = await fetch(
    `http://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`
  )
    .then((respuesta) => respuesta.json())
    .then((data) => data);

  const actualizada = await {
    ...seleccionada,
    comentarios: respuesta,
  };

  const publicaciones_actualizadas = [...publicaciones];
  publicaciones_actualizadas[index] = await actualizada;

  dispatch({
    type: TRAER_COMENTARIOS,
    payload: publicaciones_actualizadas,
  });
};
