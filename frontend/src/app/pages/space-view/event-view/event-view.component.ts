import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { VenueService } from '../../../shared/services/venue.service';
import { EventService } from '../../../shared/services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.scss'
})
export class EventViewComponent implements OnInit {

  userId: string | null = null;
  venues: any[] = [];
  eventId: void;
  events: any[] = [];

  constructor (private authService: AuthService, private venueService:VenueService, private eventService:EventService ) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe((userId: string | null) => {
      this.userId = userId;
      console.log("id user:", this.userId);
    });
    this.getVenuesByUserId()
  }


  getVenuesByUserId() {
    this.venueService.getVenuesByUserId().subscribe({
      next: (response) => {
        this.venues = response.data.filter(venues => venues.id_user == this.userId)
        console.log(`Venues con el user id: ${this.userId}:`, this.venues);
        this.eventId = this.venues.forEach((venue) => {(venue.id_venue)})
      },
      error: (err) => {
        console.log('Error al buscar las venues:', err);
      }
    });
  }

  // getEventsbyVenueId() {
  //   this.eventService.getEventsByVenueId(this.eventId).subscribe({
  //     next: (response) => {
  //       this.events = response.data.filter
  //     }
  //   })
  // }
}
