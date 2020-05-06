export interface Tarea {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Tareas {
  tareas: Tarea[];
}
