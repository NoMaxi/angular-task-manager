import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Task, statuses } from '../../../../shared/interfaces/task';
import { TasksStoreService } from '../../../../shared/services/tasks-store.service';
import { TaskService } from '../../../../shared/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  statuses: string[] = statuses;
  tasks: Task[] = [];
  routeFilterObj: object;
  searchFilterObj: object;

  constructor(
      private route: ActivatedRoute,
      private tasksStoreService: TasksStoreService,
      private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams.filter) {
      this.routeFilterObj = JSON.parse(atob(queryParams.filter));
    }

    this.subscription = this.taskService.getTasks().subscribe(
        (tasks: Task[]) => {
          if (tasks) {
            this.tasks = tasks;
            this.tasksStoreService.data = tasks;
          }
        },
        (err) => console.error(err)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getSearchText(text: string): void {
    this.searchFilterObj = {
      summary: text,
      description: text
    };
  }
}
