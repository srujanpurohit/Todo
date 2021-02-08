export interface CreateTodo {
  _id?: number;
  title: string;
  body: string;
  media: string[];
  status: 'Todo' | 'Done';
  created: Date;
  edited?: Date;
  deleted: boolean;
  owner: string;
}

export interface TodoData extends CreateTodo {
  _id: number;
}
