import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  priorities,
  types,
  statuses
} from '../../../../shared/interfaces/task';
import { compareUsers } from '../../../../shared/helpers/compareUsers';
import { User } from '../../../../shared/interfaces/user';
import { Task } from '../../../../shared/interfaces/task';
import { MessageService } from '../../../../shared/services/message.service';
import { CurrentUserStoreService } from '../../../../shared/services/current-user-store.service';
import { UserService } from '../../../../shared/services/user.service';
import { TaskService } from '../../../../shared/services/task.service';

@Component({
  selector: 'app-task-item-details',
  templateUrl: './task-item-details.component.html',
  styleUrls: ['./task-item-details.component.scss']
})
export class TaskItemDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('editor', { static: true }) editor;
  private subscription: Subscription = new Subscription();
  isBeingEdited = false;
  priorities: string[] = [...priorities];
  types: string[] = [...types];
  statuses: string[] = [...statuses];
  compareUsers: (user1: User, user2: User) => boolean = compareUsers;
  editTaskForm: FormGroup;
  initialTaskFormValue: object;
  minDate: Date;
  task: Task;
  users: User[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private currentUserStoreService: CurrentUserStoreService,
    private userService: UserService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.editTaskForm = new FormGroup({
      summary: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      assignee: new FormControl('', Validators.required),
      reporter: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      descriptionHTML: new FormControl('', Validators.required)
    });
    this.editTaskForm.disable();

    const sub1: Subscription = this.userService.getUsers().subscribe(
      (users: User[]) => {
        if (users) {
          this.users = users;
        }
      },
      (err) => console.error(err)
    );
    const taskId = this.route.snapshot.paramMap.get('id');
    const sub2: Subscription = this.taskService.getTaskById(taskId).subscribe(
      (task: Task) => {
        if (task.id) {
          this.task = task;
          this.editTaskForm.setValue({
            summary: task.summary,
            type: task.type,
            priority: task.priority,
            status: task.status,
            assignee: task.assignee,
            reporter: task.reporter,
            dueDate: task.dueDate,
            descriptionHTML: task.descriptionHTML
          });
          this.initialTaskFormValue = this.editTaskForm.value;
        }
      },
      (err) => console.error(err)
    );
    this.subscription.add(sub1);
    this.subscription.add(sub2);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setTaskEditable(event: Event): void {
    event.preventDefault();
    this.isBeingEdited = true;
    this.editTaskForm.enable();
  }

  onUpdateSubmit(): void {
    const updatedTaskData: Partial<Task> = {
      ...this.editTaskForm.getRawValue(),
      updatedAt: new Date().toISOString(),
      dueDate: new Date(this.editTaskForm.get('dueDate').value).toISOString(),
      description: this.editor.quillEditor.getText()
    };
    this.taskService.updateTaskById(this.task.id, updatedTaskData)
      .then(() => this.router.navigate(['tasks/dashboard']))
      .then(() => this.messageService.showSuccess(
        `${updatedTaskData.type} has been updated`
      ))
      .catch((err) => {
        console.error(err);
        this.messageService.showError(err.message);
      });
  }

  onDeleteSubmit(event: Event): void {
    event.preventDefault();
    if (confirm(`Are you sure you want to delete this ${this.task.type}?`)) {
      this.taskService.deleteTaskById(this.task.id)
        .then(() => this.router.navigate(['tasks/dashboard']))
        .then(() => this.messageService.showSuccess(
          `${this.task.type} has been deleted`
        ))
        .catch((err) => {
          console.error(err);
          this.messageService.showError(err.message);
        });
    }
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.isBeingEdited = false;
    this.editTaskForm.disable();
    this.editTaskForm.setValue(this.initialTaskFormValue);
    this.messageService.showWarn('Task edition has been canceled');
  }
}
