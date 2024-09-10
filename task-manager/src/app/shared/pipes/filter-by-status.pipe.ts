import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(tasks: Task[], status: string): Task[] {
    return tasks.filter(task => task.status === status);
  }

}
