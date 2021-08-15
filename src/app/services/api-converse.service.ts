import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Project} from '../models/project-model';
import {Todo} from '../models/todo-model';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiConverseService {
  private _projects = new BehaviorSubject<Project[]>([]);
  private objects: Project[] = [];
  readonly projects: Observable<Project[]> = this._projects.asObservable();
  project: Project | undefined;

  constructor(private api: ApiService) {
    this.getProjects();
  }

  getProjects(): void {
    this.api.getProjects().subscribe((projects) => {
      this.objects = projects;
      this._projects.next(this.objects);
    });
  }

  updateTodo(project:Project, todo: Todo): void {
    this.api.updateTodo(project, todo).subscribe((todo_changed) => {
      todo_changed.toggleCompleted();
      this._projects.next(this.objects);
    });
  }

  createTodo(todo_text: string, project_title: string): void {
    this.api.createTodo(todo_text, project_title).subscribe(todo => {
      this.project = this.objects.find(e => e.id === todo.project_id);
      if (typeof this.project !== 'undefined') {
        this.project.todos.push(todo);
      } else {
        let newProject = new Project(project_title);
        newProject.todos = [todo];
        this.objects.push(newProject);
      }
    });
  }
}