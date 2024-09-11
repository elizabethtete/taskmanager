import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
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
  // tasks: Task[] = [];
  showModal: boolean = false;
  taskToEdit?: Task;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) {
    this.tasks$ = this.taskService.getTasks();
  }

  // ngOnInit(): void {
  //   this.loadTasks();
  // }

  // loadTasks(): void {
  //   this.taskService.getTasks()
  //   .subscribe(tasks => {
  //     this.tasks = [...tasks];
  //   }
  //   );
  // }

  openFormModal(): void {
    this.showModal = true;
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  closeFormModal(): void {
    this.taskToEdit = undefined;
    this.showModal = false;
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  handleEdit(task: Task): void {
    this.taskToEdit = task;
    this.showModal = true;
    this.router.navigate([`${task.id}/edit`], { relativeTo: this.route });
  }

  handleDelete(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
      this.tasks$ = this.taskService.getTasks(); 
      // this.loadTasks();
    }
  }

  updateStatus(event: { task: Task, newStatus: string }): void {
    // this.taskService.updateTaskStatus(event.task.id, event.newStatus);
    this.tasks$ = this.tasks$.pipe(
      map(tasks => tasks.map(task =>
        task.id === event.task.id ? { ...task, status: event.newStatus } : task
      ))
    );
    // this.tasks$ = this.taskService.getTasks();
  }
}
