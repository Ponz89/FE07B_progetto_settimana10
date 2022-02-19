import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import * as TodoServizio from '../todos.service';

@Component({
  template: `
    <div>
      <ng-container *ngIf="tasks; else elseTemplate">
        <div *ngIf="tasks.length > 0; else elseNoTask">
          <div *ngFor="let task of tasks; let i = index">
            <div class="task.title">
              - {{ task.title }}
              <button class="complete" (click)="completeTask(task, i)">
                💀
              </button>
            </div>
          </div>
        </div>
      </ng-container>
      <ng-template #elseTemplate>
        <p class="infoTemplate">Recupero Tasks..</p>
      </ng-template>
    </div>
    <ng-container>
      <div class="btn">
        <input type="text" [(ngModel)]="newTaskTitle" />
        <br>
        <button (click)="addTask()">Aggiungi un Task</button>
      </div>
    </ng-container>
    <ng-template #elseNoTask>
      <p class="infoTemplate">Oops, non ci sono Task..</p>
    </ng-template>
  `,
  styles: [
    `
      button {
        font-size: 26px;
        font-family: 'Dancing Script', cursive;
        background: transparent;
        border: none;
        cursor: pointer;
      }
      .btn {
        margin-top: 10rem;
      }
      button.complete {
        font-size: 16px;
        background: transparent;
        border: none;
        cursor: pointer;
      }
      .btn {
        margin-top: 1rem;
      }

      .infoTemplate {
        font-size: 18px;
      }
    `,
  ],
})
export class TodosPage implements OnInit {
  tasks!: Todo[];

  newTaskTitle: string | undefined;
  constructor() {
    TodoServizio.get().then(
      (todos) => (this.tasks = todos.filter((todo) => !todo.completed))
    );
  }

  ngOnInit(): void {}
  async addTask() {
    const nTodo = await TodoServizio.add({
      title: this.newTaskTitle as string,
      completed: false,
    });
    this.tasks.push(nTodo);
    this.newTaskTitle = '';
  }
  async completeTask(todo: Todo, i: number) {
    await TodoServizio.aggiorna({ completed: true }, todo.id);
    this.tasks.splice(i, 1);
  }
}
