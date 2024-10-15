import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateGroupService {

  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:3000/group';

  createGroup(credentials: { name: string, musicians: string, description: string, genre: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, credentials,{ withCredentials: true }); 
  }

}
