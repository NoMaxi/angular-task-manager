import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Task } from '../interfaces/task';
import { GlobalAuthService } from './global-auth.service';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  private tasks: Task[] = [];
  private tasksWatcherSource: BehaviorSubject<Task[]> =
    new BehaviorSubject<Task[]>(this.data);
  public tasksWatcher: Observable<Task[]> =
    this.tasksWatcherSource.asObservable();

  constructor(
    private globalAuthService: GlobalAuthService,
    private taskService: TaskService
  ) { }

  get data(): Task[] {
    return this.tasks;
  }

  set data(tasks: Task[]) {
    this.tasks = [...tasks];
    this.tasksWatcherSource.next([...tasks]);
  }

  initTasks(): Subscription {
    if (this.globalAuthService.isLoggedIn) {
      return this.taskService.getTasks().subscribe(
        (tasks: Task[]) => {
          if (tasks) {
            this.data = tasks;
          }
        },
        (err) => console.error(err)
      );
    }
  }
}
