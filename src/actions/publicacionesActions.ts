import {
  TRAER_PUBLICACIONES,
  CARGANDO_PUBLICACIONES,
  ERROR_PUBLICACIONES,
  CARGADO_PUBLICACIONES,
  TRAER_PUBLICACION,
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
