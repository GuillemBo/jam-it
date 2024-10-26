import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { VenueService } from '../../../shared/services/venue.service';
import { CreateVenueFormComponent } from "../../space-view/create-venue-form/create-venue-form.component";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, CreateVenueFormComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {

  events: any[] = [];
  venues: any[] = [];

  constructor (private _eventService: EventService, private _venueService: VenueService) {}

  ngOnInit(): void {
    this.getEventsWithApplicationId()
  }

  getEventsWithApplicationId() {
    this._eventService.getAllEvents().subscribe({
      next: (response) => {
        this.events = response.filter(event => event.id_application !== null && event.id_application !== undefined);

        const eventVenueIds = this.events.map(event => event.id_venue);

        this._venueService.getVenuesByUserId().subscribe({
          next: (venueResponse) => {
            this.venues = venueResponse.data.filter(venue => eventVenueIds.includes(venue.id_venue));
          },
          error: (error) => {
            console.error('Error al obtener venues:', error);
          }
        });
      },

      error: (error) => {
        console.error('Error al obtener eventos:', error);
      },
    });
  }

}
