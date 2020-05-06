export interface Comentarios {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Publicacion {
  userId: number;
  id: number;
  title: string;
  body: string;
  abierto: boolean;
  comentarios: Comentarios[];
}
