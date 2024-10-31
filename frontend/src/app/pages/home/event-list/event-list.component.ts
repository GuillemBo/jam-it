import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { CreateVenueFormComponent } from "../../space-view/create-venue-form/create-venue-form.component";


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, CreateVenueFormComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {

  activeEvents$ = this._eventService.activeEvents$;


  constructor (private _eventService: EventService) {}

  ngOnInit(): void {
    this._eventService.getAllEvents();
  }

}
