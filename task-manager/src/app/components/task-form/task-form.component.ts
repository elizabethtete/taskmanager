import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TASK_STATUSES } from 'src/app/models/task-status.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit {
  @Input() taskToEditSubject$!: BehaviorSubject<Task | null>;
  @Output() closeModal = new EventEmitter<boolean>();
  taskForm!: FormGroup;
  existingTasks: Task[] = [];
  taskStatuses = TASK_STATUSES;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      priority: ['', Validators.required],
      dueDate: ['', [Validators.required, this.notPastDate]],
      linkedTasks: [[]],
      status: ['', Validators.required]
    });

    
    this.taskService.getTasks().subscribe(tasks => this.existingTasks = tasks);

    // if (this.taskToEdit) {
    //   this.setFormValues(this.taskToEdit);
    // }

    this.taskToEditSubject$.subscribe(task => {
      if (task) {
        this.setFormValues(task);
      } else {
        this.taskForm.reset();
      }
    });
  }

  setFormValues(task: Task): void {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      linkedTasks: task.linkedTasks,
      status: task.status
    });
  }

  notPastDate(control: FormControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      if (this.taskToEditSubject$.getValue()) {
        const updatedTask: Task = {
          ...this.taskToEditSubject$.getValue(),
          ...taskData
        };
        this.taskService.updateTask(updatedTask);
      } else {
        this.taskService.addTask(taskData);
      }
      this.taskForm.reset();
      this.closeModal.next(true);
    }
  }
}
