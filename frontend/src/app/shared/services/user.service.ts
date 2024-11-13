import { Injectable } from '@angular/core';
import { User, UserResponse } from '../models/user.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/user';

  getUserById$(id_venue: number): Observable<User[]> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id_venue}`, {withCredentials: true}).pipe(map(response => response.data))
  }

}
