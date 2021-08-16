import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project-model';
import { Todo } from '../models/todo-model';

const url = environment.apiUrl;


@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(url + 'projects')
      .pipe(map((plainProjects) => plainToClass(Project, plainProjects)));
  }

  updateTodo(project:Project, todo: Todo): Observable<Todo> {
    return this.http
      .patch<Todo>(url + 'projects/'+ project.id + '/todos/' + todo.id, this.httpOptions)
      .pipe(map((plainTodo) => plainToClass(Todo, plainTodo)));
  }

  createTodo(todoText: string, projectTitle: string): Observable<Todo> {
    const body = `{
        "text":"${todoText}",
        "title":"${projectTitle}"
    }`;
    return this.http
      .post(url + 'todos', body, this.httpOptions)
      .pipe(map((plainTodo) => plainToClass(Todo, plainTodo)));
  }
}