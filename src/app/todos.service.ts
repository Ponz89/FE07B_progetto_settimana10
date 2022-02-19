import { Todo } from './models/todo';

let todos: Todo[] = [];

export function get(): Promise<Todo[]> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(todos);
    }, 2000);
  });
}

export function add(task: any): Promise<Todo> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newTodo: Todo = { ...task, id: todos.length + 1 };
      console.log(task);
      todos.push(newTodo);
      resolve(newTodo);
    }, 2000);
  });
}

export function aggiorna(newTodo: Partial<Todo>, id: number): Promise<Todo> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      todos = todos.map((todo) =>
        todo.id == id ? { ...todo, ...newTodo } : todo
      );
      const updatedTodo = todos.find((todo) => todo.id == id);
      if (updatedTodo) {
        resolve(updatedTodo);
      } else {
        reject('todo non trovato');
      }
    }, 2000);
  });
}
