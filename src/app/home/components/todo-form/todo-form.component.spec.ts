import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  let activatedRouteService = { params: of(1) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteService },
        FormBuilder
      ],
      imports: [RouterTestingModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
