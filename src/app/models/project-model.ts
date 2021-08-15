import { Todo } from './todo-model';

export class Project {
  constructor(title: string) {
    this.title = title;
  }
  id!: number;
  title!: string;
  todos!: Todo[];
}