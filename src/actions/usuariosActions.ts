import { TRAER_TODOS, CARGANDO, ERROR, CARGADO } from '../types/usuariosTypes';
import { Usuario } from '../data/usuario';
import { Dispatch } from 'redux';

export const traerTodos = (respuesta: Usuario[]) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: TRAER_TODOS,
    payload: respuesta,
  });
};

export const cargaAction = () => (dispatch: Dispatch) => {
  dispatch({ type: CARGANDO });
};

export const terminarCarga = () => (dispatch: Dispatch) => {
  dispatch({ type: CARGADO });
};

export const setError = () => (dispatch: Dispatch) => {
  dispatch({
    type: ERROR,
    payload: 'Algo salió mal, intente más tarde',
  });
};
