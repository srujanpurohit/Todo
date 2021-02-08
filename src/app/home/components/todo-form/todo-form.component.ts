import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TodoData } from 'src/app/models/todo.model';
import { AuthService } from 'src/app/shared/auth.service';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, AfterViewInit {
  constructor(
    private _route: ActivatedRoute,
    private _todo: TodoService,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private modalService: NgbModal,
    private _router: Router
  ) {
    this._route.params
      .pipe(
        switchMap(({ id }) =>
          id ? this._todo.getParticularTodo(+id) : of(null)
        )
      )
      .subscribe((todo: TodoData) => {
        if (todo) {
          this.mode = 'Edit';
          this._todoData = todo;
          this.form.patchValue({
            ...todo,
            status: todo.status === 'Done' ? true : false
          });
        } else {
          this.mode = 'Add';
        }
      });
  }

  @ViewChild('content') content;
  mode: 'Add' | 'Edit';
  private _todoData: TodoData;
  private _modal: NgbModalRef;

  form = this._fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    media: this._fb.array(['', '']),
    status: false,
    deleted: false,
    owner: this._auth.username
  });

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.open(this.content);
  }

  delete() {
    this._todo.updateTodo(this._todoData._id, {
      ...this._todoData,
      deleted: true
    });
    this._modal.close();
  }

  save() {
    let status: TodoData['status'] =
      this.form.get('status').value === true ? 'Done' : 'Todo';
    if (this.mode === 'Add') {
      this._todo.addTodo({
        ...this.form.value,
        status,
        created: new Date()
      });
    } else if (this.mode === 'Edit') {
      this._todo.updateTodo(this._todoData._id, {
        ...this._todoData,
        ...this.form.value,
        status,
        edited: new Date()
      });
    }
    this._modal.close();
  }

  open(content) {
    this._modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    });

    this._modal.result.then(
      result => {
        this._router.navigateByUrl('');
      },
      reason => {
        this._router.navigateByUrl('');
      }
    );
  }
}
