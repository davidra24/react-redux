import {
  TRAER_USUARIOS,
  CARGANDO_USUARIOS,
  ERROR_USUARIOS,
  CARGADO_USUARIOS,
} from '../types/usuariosTypes';

const INITIAL_STATE = {
  usuarios: [],
  cargando: false,
  error: null,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TRAER_USUARIOS:
      return { ...state, usuarios: action.payload, cargando: false };
    case CARGANDO_USUARIOS:
      return { ...state, cargando: true };
    case CARGADO_USUARIOS:
      return { ...state, cargando: false };
    case ERROR_USUARIOS:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
