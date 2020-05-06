import {
  TRAER_TAREAS,
  CARGANDO_TAREAS,
  ERROR_TAREAS,
  CAMBIA_USUARIO_ID,
  CAMBIAR_TITULO,
  TAREA_GUARDADA,
  LIMPIAR_TAREA,
  ACTUALIZAR,
} from '../types/tareasTypes';

const INITIAL_STATE = {
  tareas: {},
  cargando: false,
  error: null,
  usuario_id: '',
  titulo: '',
  regresar: false,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TRAER_TAREAS:
      return {
        ...state,
        tareas: action.payload,
        cargando: false,
        regresar: false,
      };
    case CARGANDO_TAREAS:
      return { ...state, cargando: true };
    case ERROR_TAREAS:
      return { ...state, error: action.payload, cargando: false };
    case CAMBIA_USUARIO_ID:
      return { ...state, usuario_id: action.payload };
    case CAMBIAR_TITULO:
      return { ...state, titulo: action.payload };
    case TAREA_GUARDADA:
      return {
        ...state,
        tareas: {},
        cargando: false,
        error: null,
        regresar: true,
        usuario_id: '',
        titulo: '',
      };
    case ACTUALIZAR:
      return { ...state, tareas: action.payload };
    case LIMPIAR_TAREA:
      return { ...state, usuario_id: '', titulo: '' };
    default:
      return state;
  }
};
