import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module')
      .then(module => module.AuthModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./modules/task-manager/task-manager.module')
      .then(module => module.TaskManagerModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'tasks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
