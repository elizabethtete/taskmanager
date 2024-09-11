import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { TASK_STATUSES } from 'src/app/models/task-status.model';
import { Task } from 'src/app/models/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  @Output() updateStatus = new EventEmitter<{task: Task, newStatus: string}>();
  
  taskStatuses = TASK_STATUSES;
  connectedDropLists: string[] = [];

  constructor() {
    this.connectedDropLists = this.taskStatuses.map(status => status.value);
  }

  editTask(task: Task): void {
    this.edit.emit(task);
  }

  deleteTask(taskId: number): void {
    this.delete.emit(taskId);
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: string): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = newStatus;
      this.updateStatus.emit({ task, newStatus });
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
