import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Venue, VenueResponse } from '../models/venue.interface';

@Injectable({
  providedIn: 'root'
})
export class VenueService {


  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:3000/venue';

  getVenuesByUserId(): Observable<VenueResponse> {
    return this.http.get<VenueResponse>(`${this.apiUrl}`, {withCredentials: true});
  }

}
