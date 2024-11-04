import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { Venue, VenueResponse } from '../models/venue.interface';
import { VenueState } from './venue.state';

@Injectable({
  providedIn: 'root'
})
export class VenueService {


  constructor(private http: HttpClient, private router: Router, private _venueState: VenueState) {}

  private apiUrl = 'http://localhost:3000/venue';

  loadVenuesByUserId(id_user: number): void {
    this.http.get<VenueResponse>(`${this.apiUrl}/venuesByUserId/${id_user}`, {withCredentials: true})
    .pipe(
      take(1),
      map(response => response.data)
  ).subscribe({
    next: (venues) => {
      this._venueState.setVenues(venues);
    }, 
    error: (err) => {
      console.error(err)
    }
  });
  }

  getUserVenues$(): Observable<Venue[]> {
    return this._venueState.getVenues$()
  }

  getVenueById$(id_venue: number): Observable<Venue[]> {
    return this.http.get<VenueResponse>(`${this.apiUrl}/${id_venue}`, {withCredentials: true}).pipe(map(response => response.data))
  }

}
