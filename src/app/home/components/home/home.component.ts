import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoData } from 'src/app/models/todo.model';
import { AuthService } from '../../../shared/auth.service';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _auth: AuthService, private _todoService: TodoService) {
    this.todoList = this._todoService.todoList;
  }

  todoList: Observable<TodoData[]>;

  username = this._auth.username;

  ngOnInit(): void {}

  logout() {
    this._auth.logout();
  }
}
