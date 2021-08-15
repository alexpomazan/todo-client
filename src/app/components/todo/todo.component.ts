import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../../models/todo-model';
import {Project} from '../../models/project-model';
import {ApiConverseService} from '../../services/api-converse.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less'],
})

export class TodoComponent implements OnInit {
  projects$!: Observable<Project[]>;
  @Input() 
  checked!: boolean;
  
  constructor(
    private apiConverseService: ApiConverseService,
  ) {}

  trackByFn(item: any): number {
    return item.id;
  }

  ngOnInit(): void {
    this.projects$ = this.apiConverseService.projects;
  }

  switchTodoIsCompleted(project: Project, todo: Todo): void {
    this.apiConverseService.updateTodo(project, todo);
  }
}