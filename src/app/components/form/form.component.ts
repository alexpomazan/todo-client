import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {ApiConverseService} from '../../services/api-converse.service';
import {Project} from 'src/app/models/project-model';

interface NewTask {
  todoText: string;
  selectedCategory: string;
  newCategory: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
})
export class FormComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  todoForm!: FormGroup

  projects$: Observable<Project[]>;

  constructor(
    private fb: FormBuilder,
    private ApiConverseService: ApiConverseService
  ) {
    this.projects$ = this.ApiConverseService.projects;
  }

  ngOnInit(): void {
    this.initForm();
    this.subscriptions.push(
      this.todoForm
        .get('selectedCategory')!
        .valueChanges.subscribe((value) => {
        if (value === 'new') {
          this.todoForm.get('newCategory')!.enable();
        } else {
          this.todoForm.get('newCategory')!.disable();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  trackByFn(item: any): number {
    return item.id;
  }

  initForm() {
    this.todoForm = this.fb.group({
      todoText: [null, [Validators.required]],
      selectedCategory: [null, [Validators.required]],
      newCategory: [
        {value: null, disabled: true},
        [Validators.required],
      ],
    });
  }

  submit(new_task: NewTask) {
    if (new_task.selectedCategory === 'new') {
      this.ApiConverseService.createTodo(
        new_task.todoText,
        new_task.newCategory
      );
    } else {
      this.ApiConverseService.createTodo(new_task.todoText, new_task.selectedCategory);
    }
  }
}