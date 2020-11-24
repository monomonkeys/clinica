import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any[];
  options: any;

  constructor() { 
    this.events = [
      {
        "title": "All Day Event",
        "start": "2020-11-20"
      },
      {
        "title": "Long Event",
        "start": "2020-11-17",
        "end": "2020-11-18"
      },
      {
        "title": "Repeating Event",
        "start": "2020-11-15T16:00:00"
      }
    ]
  }

  ngOnInit(): void {
  }

}
