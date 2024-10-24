import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:3000/application';

  applyToEvent(credentials: {id_event: number, id_group: number, titulodeloquehago: string, descriptiondeloquehago: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, credentials, { withCredentials: true });
  }

  // Servicio Angular: event.service.ts
  updateApplicationStatus(applicationId: string, status: string): Observable<any> {
    return this.http.post(`http://localhost:3000/${applicationId}/status`, { status }, {withCredentials: true});
  }


}
