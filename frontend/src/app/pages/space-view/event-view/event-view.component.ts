import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { VenueService } from '../../../shared/services/venue.service';
import { EventService } from '../../../shared/services/event.service';
import { CommonModule, NgClass } from '@angular/common';
import { ApplicationService } from '../../../shared/services/application.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, switchMap, throwError } from 'rxjs';


@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.scss'
})
export class EventViewComponent implements OnInit {

  userId$ = this._authService.userId$;
  venues$ = this._authService.userId$.pipe(
    filter(u => !!u),
  switchMap(userId => this.venueService.getVenuesByUserId(userId))
  )

  constructor (private _authService: AuthService, private venueService:VenueService, private eventService:EventService, private _applicationService: ApplicationService, private toastr: ToastrService ) {}

  ngOnInit(): void {
    
  }

  updateApplicationStatus(applicationId: string, status: string) {
    this._applicationService.updateApplicationStatus(applicationId, status).pipe(
      catchError(err => {
        this.toastr.error('Error updating application status');
        return throwError(() => err);
      })
    ).subscribe((response) => {
      if (status === 'accepted') {
      this.toastr.success(`Application has been ${status}`);
      } else {
        this.toastr.warning(`Application has been ${status}`);
      }
      // Aquí puedes actualizar el estado en la UI o volver a cargar los datos
      this.refreshEventApplications(); // Vuelve a cargar los eventos y las aplicaciones (opcional)
    });
  }

  // Método opcional para refrescar los eventos con aplicaciones después de la actualización
  refreshEventApplications() {
    // Aquí podrías recargar los eventos o filtrar las aplicaciones directamente en la vista
  }

}
