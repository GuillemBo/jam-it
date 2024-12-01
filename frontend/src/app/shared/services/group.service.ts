import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Group, GroupResponse } from '../models/group.interface';
import { GroupState } from './group.state';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private router: Router, private _groupState: GroupState) {}

  private apiUrl = 'http://localhost:3000/group';

  getGroupsByUserId(): Observable<GroupResponse> {
    return this.http.get<GroupResponse>(`${this.apiUrl}`, {withCredentials: true});
  }


  loadGroupsByUserId(id_user: number): void {
    this.http.get<GroupResponse>(`${this.apiUrl}/groupsByUserId/${id_user}`, {withCredentials: true})
    .pipe(
      take(1),
      map(response => response.data)
  ).subscribe({
    next: (groups) => {
      this._groupState.setGroups(groups);
    }, 
    error: (err) => {
      console.error(err)
    }
  });
  }

  getUserGroups$(): Observable<Group[]> {
    return this._groupState.getGroups$()
  }

  deleteGroupById(id_group: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_group}`, {withCredentials: true})
  }

  getGroupById$(id_group: number): Observable<Group[]> {
    return this.http.get<GroupResponse>(`${this.apiUrl}/${id_group}`, {withCredentials: true}).pipe(map(response => response.data))
  }

}
