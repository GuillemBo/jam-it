import { Component } from '@angular/core';
import { EventService } from '../../../shared/services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {


  events = this._eventService.getEvents();

  constructor (private _eventService: EventService) {}


}
