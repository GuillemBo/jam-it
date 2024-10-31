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
  venues$ = this._authService.userId$.pipe(
    filter(u => !!u),
  switchMap(userId => this.venueService.getVenuesByUserId(userId))

  )

  constructor (private _authService: AuthService, private venueService: VenueService){}

  ngOnInit(): void {

  }



}
