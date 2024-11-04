import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Venue } from "../models/venue.interface";

@Injectable({
    providedIn: 'root'
  })

export class VenueState {

    private _venues: BehaviorSubject<Venue[]> = new BehaviorSubject([])

    setVenues(venues: Venue[]): void {
        this._venues.next(venues)
    }

    getVenues$(): Observable<Venue[]> {
        return this._venues.asObservable()
    }
    
}