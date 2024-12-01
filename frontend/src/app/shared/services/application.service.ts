import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient, private router: Router, private _toastr: ToastrService) {}

  private apiUrl = 'http://localhost:3000/application';

  applyToEvent(credentials: {id_event: number, id_group: number, titulodeloquehago: string, descriptiondeloquehago: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, credentials, { withCredentials: true });
  }

  // Servicio Angular: event.service.ts
  updateApplicationStatus(applicationId: string, status: string): Observable<boolean | object> {
   return this.http.put(`${this.apiUrl}/status/${applicationId}`, { status }, {withCredentials: true}).pipe(take(1),catchError(err => {
    this._toastr.error('Error updating application status');
    return throwError(() => err);
   }), tap(result =>{
    if (status === 'accepted') {
      this._toastr.success(`Application has been ${status}`);
    } else {
      this._toastr.warning(`Application has been ${status}`);
    }
    return true
   }
  ));

}

deleteApplicationById(applicationId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${applicationId}`, {withCredentials: true})
}

}