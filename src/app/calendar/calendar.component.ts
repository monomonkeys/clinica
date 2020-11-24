import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',  
    dateClick: this.handleDateClick.bind(this),
    locale: esLocale,
    events: [
      { title: 'event 1', date: '2020-11-19' },
      { title: 'event 2', date: '2020-11-23T06:00:00' }  
    ],
    weekends: false 
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }


}
