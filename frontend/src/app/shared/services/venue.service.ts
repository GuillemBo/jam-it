import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Venue, VenueResponse } from '../models/venue.interface';

@Injectable({
  providedIn: 'root'
})
export class VenueService {


  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:3000/venue';

  getVenuesByUserId(id_user: number): Observable<Venue[]> {
    return this.http.get<VenueResponse>(`${this.apiUrl}/venuesByUserId/${id_user}`, {withCredentials: true}).pipe(map(response => response.data));
  }

}
