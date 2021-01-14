import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTaskFormComponent } from './components/create-task-form/create-task-form.component';
import { TaskItemDetailsComponent } from './components/task-item-details/task-item-details.component';

const routes: Routes = [
  {
    path: '',
    component: TaskManagerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'my',
        component: DashboardComponent,
      },
      {
        path: 'assigned',
        component: DashboardComponent,
      },
      {
        path: 'create',
        component: CreateTaskFormComponent
      },
      {
        path: ':id',
        component: TaskItemDetailsComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagerRoutingModule {
}
