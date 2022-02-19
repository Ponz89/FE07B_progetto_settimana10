import { Component } from '@angular/core';
import { Todo } from '../models/todo';
import * as TodoServizio from '../todos.service';

@Component({
  template: `
    <div>
      <ng-container *ngIf="tasks; else elseTemplate">
        <div *ngIf="tasks.length > 0; else elseNoTask">
          <div *ngFor="let task of tasks; let i = index">
            <div>- {{ task.title }}</div>
          </div>
        </div>
      </ng-container>
      <ng-template #elseTemplate>
        <p>Recupero Task..</p>
      </ng-template>
    </div>
    <ng-template #elseNoTask> <p>Non ci sono task completati</p> </ng-template>
  `,
  styles: [],
})
export class CompletedPage {
  tasks!: Todo[];

  newTaskTitle: string | undefined;
  constructor() {
    TodoServizio.get().then(
      (todos) => (this.tasks = todos.filter((todo) => todo.completed))
    );
  }
}
