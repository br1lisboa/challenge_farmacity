import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.getEvents();
  }
  
  getEvents(): void {
    this.eventsService.getEvents()
      .subscribe(
        e => this.events = e, 
        err => console.log(err)
      );
  }

  // newEvent(): void {        
  //   this.eventsService.addEvent()
  //     .subscribe(e => {
  //       this.events.push(e);
  //     });
  // }
}
