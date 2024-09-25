import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDashboardComponent {
  tasks$: Observable<Task[]>;
  taskToEditSubject$: BehaviorSubject<Task | null> = new BehaviorSubject<Task | null>(null);


  showModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) {
    this.tasks$ = this.taskService.getTasks();

    this.taskToEditSubject$.subscribe(task => {
      this.showModal$.next(task !== null);
    });
  }

  openFormModal(): void {
    this.showModal$.next(true);
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  closeFormModal(): void {
    this.taskToEditSubject$.next(null);
    this.showModal$.next(false);
    this.taskService.refreshTasks();

    this.router.navigate(['..'], { relativeTo: this.route });
  }

  handleEdit(task: Task): void {
    this.taskToEditSubject$.next(task);
    this.showModal$.next(true);

    this.router.navigate([`${task.id}/edit`], { relativeTo: this.route });
  }

  handleDelete(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  updateStatus(event: { task: Task, newStatus: string }): void {
    const updatedTask = { ...event.task, status: event.newStatus };
    this.taskService.updateTask(updatedTask);
  }
}
