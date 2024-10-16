import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {

  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:3000/event';

  createEvent(credentials: { name: string, description: string, f_ini: Date, f_end: Date, event_type: string, date_end_bid: Date, price: number, payment: number, }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, credentials,{ withCredentials: true }); 
  }

}
