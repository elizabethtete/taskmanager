import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDashboardComponent } from 'src/app/pages/task-dashboard/task-dashboard.component';
import { TaskFormComponent } from 'src/app/components/task-form/task-form.component';

const routes: Routes = [
  {
    path: '',
    component: TaskDashboardComponent,
    children: [
      { path: 'create', component: TaskFormComponent },
      { path: ':taskId/edit', component: TaskFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
