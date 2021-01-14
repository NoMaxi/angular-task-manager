import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditorModule } from 'primeng/editor';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../../shared/shared.module';
import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTaskFormComponent } from './components/create-task-form/create-task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskItemDetailsComponent } from './components/task-item-details/task-item-details.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    SidebarComponent,
    TaskManagerComponent,
    DashboardComponent,
    CreateTaskFormComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskItemDetailsComponent,
    SearchComponent
  ],
  imports: [
    SharedModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    DragDropModule,
    EditorModule,
    QuillModule.forRoot(),
    TaskManagerRoutingModule
  ]
})
export class TaskManagerModule { }
