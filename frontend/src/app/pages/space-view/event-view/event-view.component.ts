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
  eventId: void[];
  events: any[] = [];
  eventsWithApplications: any[] = [];

  constructor (private authService: AuthService, private venueService:VenueService, private eventService:EventService ) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe((userId: string | null) => {
      this.userId = userId;
    });
    this.getVenuesByUserId()
    this.getEventsWithApplications();
    
  }


  getVenuesByUserId(): void {
    this.venueService.getVenuesByUserId().subscribe({
      next: (response) => {
        this.venues = response.data.filter(venue => venue.id_user === this.userId);
        console.log(`Venues con el user id: ${this.userId}:`, this.venues);
  
        // Realiza una única llamada para obtener todos los eventos
        this.eventService.getEventsByVenueId().subscribe({
          next: (allEvents) => {
            // Filtrar los eventos que coincidan con los venues del usuario
            this.events = allEvents.filter(event => 
              this.venues.some(venue => venue.id_venue === event.id_venue)
            );
  
            this.venues.forEach(venue => {
              venue.events = allEvents.filter(event => event.id_venue === venue.id_venue);
            });
            
            console.log('Eventos filtrados por venues del usuario:', this.events);
          },
          error: (err) => {
            console.error('Error al obtener los eventos:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al buscar las venues:', err);
      }
    });
  }
  


  getEventsWithApplications(): void {
    this.eventService.getEventWithApplications().subscribe({
      next: (response) => {
        this.eventsWithApplications = response;
        console.log('Eventos con aplicaciones:', this.eventsWithApplications);
      },
      error: (error) => {
        console.error('Error al obtener eventos con aplicaciones:', error);
      },
    });
  }

}
