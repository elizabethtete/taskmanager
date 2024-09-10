import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { TASK_STATUSES } from 'src/app/models/task-status.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  @Input() tasks: any[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();
  taskStatuses = TASK_STATUSES;

  editTask(task: Task): void {
    this.edit.emit(task);
  }

  deleteTask(taskId: number): void {
    this.delete.emit(taskId);
  }

}
