import { Component } from '@angular/core';
import { EventService } from '../../../shared/services/event.service';
import { AuthService } from '../../../shared/services/auth.service';
import { VenueService } from '../../../shared/services/venue.service';
import { CommonModule } from '@angular/common';
import { filter, switchMap, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor (private _authService: AuthService, private _venueService: VenueService, private _toastr: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.userId$.pipe(take(1)).subscribe(userId => {
      this._venueService.loadVenuesByUserId(userId)
    })
  }

  editVenue(id_venue: number): void {
    this.router.navigate(['/venues/edit', id_venue]); // Redirige a la ruta de edición
  }

  deleteVenue(id_venue: number): void {
    if (confirm('seguro que quieres eliminar venue?') == true) {
    this._venueService.deleteVenueById(id_venue).subscribe(data => {
      console.log(data)
      this._toastr.warning('El venue fue eliminado con éxito', 'Venue eliminado')
      this.userId$.pipe(take(1)).subscribe(userId => {
        this._venueService.loadVenuesByUserId(userId)
      })
    }
  )}
}

}