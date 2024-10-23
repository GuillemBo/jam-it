import { Injectable } from '@angular/core';
import { ApplyEvent, Event } from '../models/event.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:3000/event';

  getEventsByVenueId(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {withCredentials: true});
  }

  getEventWithApplicationsByVenue(userId: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/applications/${userId}`, {withCredentials: true});
  }


  //Ejemplos de eventos para aplicar y para mostrar
  getEvents(): Event[] {
    return [{
      title: 'jam in raval',
      description: 'night of music',
      musicStyle: 'jazz',
      space: null,
      group: {
        name: 'capros',
        musicians: 'bill, john',
        description: 'band of jazz',
        genre: 'jazz'
      },
      date: new Date()
    },
    {
      title: 'jam in gòtic',
      description: 'night of music',
      musicStyle: 'blues',
      space: null,
      group: {
        name: 'blue band',
        musicians: 'Joe, maria',
        description: 'band of blues',
        genre: 'blues'
      },
      date: new Date()
    }];
  }

}
