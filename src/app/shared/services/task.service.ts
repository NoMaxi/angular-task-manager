import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Task } from 'src/app/shared/interfaces/task';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksPath: string = environment.firestorePaths.tasks;

  constructor(
    private firestoreService: FirestoreService
  ) { }

  getTasks(): Observable<Task[]> {
    return this.firestoreService.getAll<Task>(this.tasksPath);
  }

  getTaskById(id: string): Observable<Task> {
    return this.firestoreService.getOneByBaseKey(this.tasksPath, id);
  }

  generateTaskId(): string {
    return this.firestoreService.generateId(this.tasksPath);
  }

  addNewTask(task: Task): Promise<void> {
    return this.firestoreService.set(this.tasksPath, task.id, task);
  }

  updateTaskById(id: string, taskData: Partial<Task>): Promise<void> {
    return this.firestoreService.update(this.tasksPath, id, taskData);
  }

  deleteTaskById(id: string): Promise<void> {
    return this.firestoreService.delete(this.tasksPath, id);
  }
}
