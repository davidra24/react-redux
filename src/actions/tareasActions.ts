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
import { Dispatch } from 'redux';
import { Tarea, Tareas } from '../data/tarea';

const API = 'https://jsonplaceholder.typicode.com/todos';

export const traerTareas = () => async (dispatch: Dispatch) => {
  dispatch({
    type: CARGANDO_TAREAS,
  });
  try {
    const respuesta = await fetch(API)
      .then((respuesta) => respuesta.json())
      .then((data) => data);

    const tareas: any = {};

    respuesta.map(
      (tarea: Tarea) =>
        (tareas[tarea.userId] = {
          ...tareas[tarea.userId],
          [tarea.id]: { ...tarea },
        })
    );

    dispatch({
      type: TRAER_TAREAS,
      payload: tareas,
    });
  } catch (error) {
    dispatch({
      type: ERROR_TAREAS,
      payload: 'Información de tareas no disponible',
    });
  }
};

export const cambiarUsuarioId = (usuario_id: any) => (dispatch: Dispatch) => {
  dispatch({
    type: CAMBIA_USUARIO_ID,
    payload: usuario_id,
  });
};
export const cambiarTitulo = (usuario_id: any) => (dispatch: Dispatch) => {
  dispatch({
    type: CAMBIAR_TITULO,
    payload: usuario_id,
  });
};

export const agregar = (nueva_tarea: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: CARGANDO_TAREAS,
  });
  try {
    const respuesta = await fetch(API, {
      method: 'POST',
      body: JSON.stringify(nueva_tarea),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    }).then((response) => response.json());

    dispatch({
      type: TAREA_GUARDADA,
    });
  } catch (error) {
    dispatch({
      type: ERROR_TAREAS,
      payload: 'Error al agregar item',
    });
  }
};
export const editar = (tarea_editada: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: CARGANDO_TAREAS,
  });
  try {
    const respuesta = await fetch(`${API}/${tarea_editada.id}`, {
      method: 'PUT',
      body: JSON.stringify(tarea_editada),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    }).then((response) => response.json());

    dispatch({
      type: TAREA_GUARDADA,
    });
  } catch (error) {
    dispatch({
      type: ERROR_TAREAS,
      payload: 'Error al agregar item',
    });
  }
};

export const cambioCheck = (usu_id: any, tarea_id: any) => (
  dispatch: Dispatch,
  getState: any
) => {
  const { tareas } = getState().tareasReducer;
  const seleccionada = tareas[usu_id][tarea_id];

  const actualizadas = {
    ...tareas,
  };

  actualizadas[usu_id] = {
    ...tareas[usu_id],
  };

  actualizadas[usu_id][tarea_id] = {
    ...tareas[usu_id][tarea_id],
    completed: !seleccionada.completed,
  };

  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas,
  });
};

export const eliminar = (tarea_id: any) => async (
  dispatch: Dispatch,
  getState: any
) => {
  dispatch({
    type: CARGANDO_TAREAS,
  });
  try {
    const respuesta = await fetch(`${API}/${tarea_id}`, {
      method: 'DELETE',
    }).then((response) => response.json());
    dispatch({
      type: TRAER_TAREAS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: ERROR_TAREAS,
      payload: 'Error al eliminar',
    });
  }
};

export const limpiarFormulario = () => (dispatch: Dispatch) => {
  dispatch({
    type: LIMPIAR_TAREA,
  });
};
