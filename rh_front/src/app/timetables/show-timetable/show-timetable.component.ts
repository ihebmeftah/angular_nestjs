import { Component } from '@angular/core';

@Component({
  selector: 'app-show-timetable',
  imports: [],
  templateUrl: './show-timetable.component.html',
  styleUrl: './show-timetable.component.css'
})
export class ShowTimetableComponent {
  calendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  };
}
