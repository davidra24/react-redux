import { TRAER_TODOS, CARGANDO, ERROR, CARGADO } from '../types/usuariosTypes';

const INITIAL_STATE = {
  usuarios: [],
  cargando: true,
  error: null,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TRAER_TODOS:
      return { ...state, usuarios: action.payload, cargando: false };
    case CARGANDO:
      return { ...state, cargando: true };
    case CARGADO:
      return { ...state, cargando: false };
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
