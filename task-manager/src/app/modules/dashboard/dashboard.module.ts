import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDashboardComponent } from 'src/app/pages/task-dashboard/task-dashboard.component';
import { TaskFormComponent } from 'src/app/components/task-form/task-form.component';
import { TaskListComponent } from 'src/app/components/task-list/task-list.component';
import { FilterByStatusPipe } from 'src/app/shared/pipes/filter-by-status.pipe';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    TaskDashboardComponent,
    TaskFormComponent,
    TaskListComponent,
    FilterByStatusPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DragDropModule
  ]
})
export class DashboardModule { }
