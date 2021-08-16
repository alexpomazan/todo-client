import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Project} from '../models/project-model';
import {Todo} from '../models/todo-model';
import {ApiService} from './api.service';
import { plainToClass } from 'class-transformer';


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
    this.api.updateTodo(project, todo).subscribe(() => {
      this._projects.next(this.objects);
    });
  }

  createTodo(todo_text: string, project_title: string): void {
    this.api.createTodo(todo_text, project_title).subscribe(() => {
      let newTodo = plainToClass(Todo, {"text": todo_text});
      let newProject = plainToClass(Project, {"title": project_title});
      this.project = this.objects.find(e => e.title === project_title);
      if (this.project) {   
        this.project.todos.push(newTodo);
      } else {
        newProject.todos = [newTodo];
        this.objects.push(newProject);
      }
    });
  }
}