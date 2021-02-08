import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoData } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() {}

  private _data: TodoData[] = [
    {
      _id: 1,
      title: 'Read Book',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      media: [],
      status: 'Todo',
      created: new Date('1/1/2020'),
      edited: new Date('2/4/2020'),
      deleted: false,
      owner: 'Srujan'
    },
    {
      _id: 2,
      title: 'Play football',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      media: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Football_iu_1996.jpg/800px-Football_iu_1996.jpg'
      ],
      status: 'Done',
      created: new Date('1/1/2020'),
      deleted: false,
      owner: 'Srujan'
    },
    {
      _id: 3,
      title: 'Buy groceries',
      body: `1. soap
      2. toothbrush
      3. Apples
      4. Coffee
      `,
      media: [],
      status: 'Todo',
      created: new Date('1/1/2020'),
      edited: new Date('2/4/2020'),
      deleted: true,
      owner: 'Srujan'
    },
    {
      _id: 4,
      title: 'Bear',
      body: `fish
      asdj
      aljsdn
      LN
      `,
      media: [
        'https://www.w3schools.com/images/w3schools_green.jpg',
        'https://www.w3schools.com/TAgs/movie.mp4'
      ],
      status: 'Todo',
      created: new Date('1/1/2020'),
      edited: new Date('2/4/2020'),
      deleted: false,
      owner: 'Srujan'
    }
  ];

  private _dataEmitter: BehaviorSubject<TodoData[]> = new BehaviorSubject(
    this._data
  );

  get todoList(): Observable<TodoData[]> {
    return this._dataEmitter
      .asObservable()
      .pipe(map(todoList => todoList.filter(({ deleted }) => !deleted)));
  }

  getParticularTodo(id: TodoData['_id']): Observable<TodoData> {
    const todo = this._data.find(({ _id }) => _id === id);
    if (todo) {
      return of({ ...todo });
    } else {
      return throwError(`Id ${id} not found`);
    }
  }

  addTodo(todo: TodoData): 'Success' | 'Error' {
    try {
      this._data.push({ _id: this._data.length + 1, ...todo });
      this._dataEmitter.next(this._data);
      return 'Success';
    } catch (err) {
      console.error(err);
      return 'Error';
    }
  }

  updateTodo(id: TodoData['_id'], data: TodoData): 'Success' | 'Error' {
    try {
      this._data.splice(id - 1, 1, data);
      this._dataEmitter.next(this._data);
      return 'Success';
    } catch (err) {
      console.error(err);
      return 'Error';
    }
  }
}
