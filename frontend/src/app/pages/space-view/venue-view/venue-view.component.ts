import { Component } from '@angular/core';
import { EventService } from '../../../shared/services/event.service';
import { AuthService } from '../../../shared/services/auth.service';
import { VenueService } from '../../../shared/services/venue.service';
import { CommonModule } from '@angular/common';
import { filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-venue-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venue-view.component.html',
  styleUrl: './venue-view.component.scss'
})
export class VenueViewComponent {

  userId$ = this._authService.userId$;
  venues$ = this._venueService.getUserVenues$()

  constructor (private _authService: AuthService, private _venueService: VenueService){}

  ngOnInit(): void {
    this.userId$.pipe(take(1)).subscribe(userId => {
      this._venueService.loadVenuesByUserId(userId)
    })
  }

  getVenueById(id_venue: number) {
    this._venueService.getVenueById$(id_venue).pipe(take(1)).subscribe({
    })

  }
}
