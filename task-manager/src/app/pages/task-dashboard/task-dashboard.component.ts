import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDashboardComponent {
  tasks: Task[] = [];
  showModal: boolean = false;
  taskToEdit?: Task;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks()
    .subscribe(tasks => {
      this.tasks = [...tasks];
    }
    );
  }

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
      this.loadTasks();
    }
  }
}
