import {
  TRAER_USUARIOS,
  CARGANDO_USUARIOS,
  ERROR_USUARIOS,
  CARGADO_USUARIOS,
} from '../types/usuariosTypes';
import { Usuario } from '../data/usuario';
import { Dispatch } from 'redux';

export const traerUsuarios = (respuesta: Usuario[]) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: TRAER_USUARIOS,
    payload: respuesta,
  });
};

export const cargaAction = () => (dispatch: Dispatch) => {
  dispatch({ type: CARGANDO_USUARIOS });
};

export const terminarCarga = () => (dispatch: Dispatch) => {
  dispatch({ type: CARGADO_USUARIOS });
};

export const setError = () => (dispatch: Dispatch) => {
  dispatch({
    type: ERROR_USUARIOS,
    payload: 'Algo salió mal, intente más tarde',
  });
};
