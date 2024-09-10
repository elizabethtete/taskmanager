import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarViewComponent } from 'src/app/pages/calendar-view/calendar-view.component';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';

@NgModule({
  declarations: [
    CalendarViewComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
