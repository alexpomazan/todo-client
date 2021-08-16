import { Todo } from './todo-model';

export class Project {
  id!: number;
  title!: string;
  todos!: Todo[];
}