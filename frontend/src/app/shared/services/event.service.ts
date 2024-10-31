import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Event } from '../models/event.interface'
import { Venue } from '../models/venue.interface';
 
@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsList: BehaviorSubject<any> = new BehaviorSubject(null)
  eventsList$ = this._eventsList.asObservable()

  activeEvents$ = this.eventsList$.pipe(
    filter(v => !!v),
    map(eventsList => eventsList.filter(event => !!event.id_application)),
    )


  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:3000/event';

  getEventsByVenueId(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}`, {withCredentials: true});
  }

  getEventWithApplicationsByVenue(userId: number | string): Observable<any> {
    return this.http.get<Event[]>(`${this.apiUrl}/applications/${userId}`, {withCredentials: true});
  }

  getAllEvents(): void {
     this.http.get<Event[]>(`${this.apiUrl}`, {withCredentials: true}).pipe(take(1)).subscribe(response => {
      this._eventsList.next(response)
     });
  }



}
