import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor() {
    this.loadTasks();
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    task.id = Date.now();
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  updateTaskStatus(taskId: number, newStatus: string): void {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks[index].status = newStatus;
      this.tasksSubject.next(this.tasks);
      this.saveTasks();
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  private loadTasks(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.tasksSubject.next(this.tasks);
    }
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
