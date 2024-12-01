import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Group } from "../models/group.interface";

@Injectable({
    providedIn: 'root'
  })

export class GroupState {

    private _groups: BehaviorSubject<Group[]> = new BehaviorSubject([])

    setGroups(groups: Group[]): void {
        this._groups.next(groups)
    }

    getGroups$(): Observable<Group[]> {
        return this._groups.asObservable()
    }
    
}