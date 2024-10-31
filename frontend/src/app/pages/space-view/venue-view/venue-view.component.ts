import { Component } from '@angular/core';
import { EventService } from '../../../shared/services/event.service';
import { AuthService } from '../../../shared/services/auth.service';
import { VenueService } from '../../../shared/services/venue.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venue-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venue-view.component.html',
  styleUrl: './venue-view.component.scss'
})
export class VenueViewComponent {

  userId: number = null;
  venues: any[] = [];

  constructor (private authService: AuthService, private venueService: VenueService){}

  ngOnInit(): void {
    this.authService.userId$.subscribe((userId: number) => {
      this.userId = userId;
      console.log("id user:", this.userId);
    });
    this.getVenuesByUserId()
  }


  getVenuesByUserId() {
    this.venueService.getVenuesByUserId().subscribe({
      next: (response) => {
        this.venues = response.data.filter(venues => venues.id_user == this.userId)
        console.log(`Venues con el id ${this.userId}:`, this.venues);
      },
      error: (err) => {
        console.log('Error al buscar las venues:', err);
      }
    });
  }

}
