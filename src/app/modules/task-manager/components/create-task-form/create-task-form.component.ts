import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {
  taskData,
  priorities,
  types,
  statuses
} from '../../../../shared/interfaces/task';
import { compareUsers } from '../../../../shared/helpers/compareUsers';
import { User } from '../../../../shared/interfaces/user';
import { Task } from '../../../../shared/interfaces/task';
import { MessageService } from '../../../../shared/services/message.service';
import { UserService } from '../../../../shared/services/user.service';
import { TaskService } from '../../../../shared/services/task.service';
import { CurrentUserStoreService } from '../../../../shared/services/current-user-store.service';

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent implements OnInit {
  @ViewChild('editor', { static: true }) editor;
  priorities: string[] = [...priorities];
  types: string[] = [...types];
  statuses: string[] = [...statuses];
  compareUsers: (user1: User, user2: User) => boolean = compareUsers;
  createTaskForm: FormGroup;
  minDate: Date;
  users$: Observable<User[]>;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private currentUserStoreService: CurrentUserStoreService,
    private userService: UserService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.users$ = this.userService.getUsers();
    this.createTaskForm = new FormGroup({
      summary: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      status: new FormControl(
        { value: taskData.status.TO_DO, disabled: true },
        Validators.required
      ),
      assignee: new FormControl('', Validators.required),
      reporter: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      descriptionHTML: new FormControl('', Validators.required)
    });
  }

  assignCurrentUser(event: Event, userType: string): void {
    event.preventDefault();
    this.createTaskForm.get(userType)
      .setValue(this.currentUserStoreService.data);
  }

  setCurrentDate(event: Event): void {
    event.preventDefault();
    this.createTaskForm.get('dueDate').setValue(new Date());
  }

  onCreateSubmit(): void {
    const newTask: Task = {
      ...this.createTaskForm.getRawValue(),
      id: this.taskService.generateTaskId(),
      creator: this.currentUserStoreService.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: new Date(this.createTaskForm.get('dueDate').value).toISOString(),
      description: this.editor.quillEditor.getText()
    };
    this.taskService.addNewTask(newTask)
      .then(() => this.router.navigate(['tasks']))
      .then(() =>
        this.messageService.showSuccess(`New ${newTask.type} has been created`))
      .catch((err) => {
        console.error(err);
        this.messageService.showError(err.message);
      });
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.createTaskForm.reset();
    this.router.navigate(['tasks/dashboard'])
      .then(() =>
        this.messageService.showWarn('Task creation has been canceled')
      )
      .catch((err) => console.error(err));
  }
}
