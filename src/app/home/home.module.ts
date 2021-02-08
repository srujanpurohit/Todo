import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, TodoFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          { path: 'add', component: TodoFormComponent },
          { path: ':id', component: TodoFormComponent }
        ]
      }
    ]),
    NgbModalModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {}
