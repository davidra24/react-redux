import {
  TRAER_PUBLICACIONES,
  CARGANDO_PUBLICACIONES,
  CARGADO_PUBLICACIONES,
  ERROR_PUBLICACIONES,
  TRAER_PUBLICACION,
  TRAER_COMENTARIOS,
} from '../types/publicacionesTypes';

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: null,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TRAER_PUBLICACIONES:
      return { ...state, publicaciones: action.payload, cargando: false };
    case TRAER_PUBLICACION:
      return { ...state, publicaciones: action.payload, cargando: false };
    case CARGANDO_PUBLICACIONES:
      return { ...state, cargando: true };
    case TRAER_COMENTARIOS:
      return { ...state, publicaciones: action.payload };
    case CARGADO_PUBLICACIONES:
      return { ...state, cargando: false };
    case ERROR_PUBLICACIONES:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
