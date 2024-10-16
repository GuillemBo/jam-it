import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateVenueService {

  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:3000/venue';

  createVenue(credentials: { title: string, address: string, capacity: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, credentials,{ withCredentials: true }); 
  }
}
