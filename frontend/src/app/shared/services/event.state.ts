import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Event } from "../models/event.interface";

@Injectable({
    providedIn: 'root'
  })

export class EventState {

    private _eventsList: BehaviorSubject<Event[]> = new BehaviorSubject([])
    
    setEventsList(eventList: Event[]): void {
        this._eventsList.next(eventList)
    }

    getEventList$(): Observable<Event[]> {
        return this._eventsList.asObservable()
    }
}