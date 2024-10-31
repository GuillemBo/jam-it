import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group, GroupResponse } from '../models/group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:3000/group';

  getGroupsByUserId(): Observable<GroupResponse> {
    return this.http.get<GroupResponse>(`${this.apiUrl}`, {withCredentials: true});
  }

}
