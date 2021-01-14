import { Component, Input, OnInit } from '@angular/core';

import { Task } from 'src/app/shared/interfaces/task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { TaskService } from '../../../../shared/services/task.service';
import { TasksStoreService } from '../../../../shared/services/tasks-store.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[];
  @Input() status: string;

  constructor(
    private tasksStoreService: TasksStoreService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void { }

  onDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const droppedItemId: string = this.tasks[event.currentIndex].id;
      this.taskService.updateTaskById(droppedItemId, { status: this.status })
        .then(() => this.tasksStoreService.data = this.tasks)
        .catch((err) => console.error(err));
    }
  }
}
