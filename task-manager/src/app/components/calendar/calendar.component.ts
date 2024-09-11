import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { addMonths, format, subMonths } from 'date-fns';
import { enGB } from 'date-fns/locale';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  showModal: boolean = false;
  selectedDate: Date | null = null;
  newEventTitle: string = '';

  @ViewChild('eventModal') eventModal: any;

  ngOnInit(): void {
    // Initialize or fetch events
  }

  onDayClick(day: CalendarMonthViewDay): void {
    this.selectedDate = day.date;
    this.showModal = true;
  }

  addEvent(): void {
    if (this.newEventTitle && this.selectedDate) {
      const newEvent: CalendarEvent = {
        start: this.selectedDate,
        end: this.selectedDate,
        title: this.newEventTitle,
        color: { primary: '#1e90ff', secondary: '#D5E8F5' },
      };
      this.events = [...this.events, newEvent];
      this.newEventTitle = '';
      this.selectedDate = null;
      this.showModal = false;
    }
  }

  prevMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  today(): void {
    this.viewDate = new Date();
  }

  get monthName(): string {
    return format(this.viewDate, 'MMMM yyyy', { locale: enGB });
  }
}
