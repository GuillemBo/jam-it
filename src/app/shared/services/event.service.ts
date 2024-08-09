import { Injectable } from '@angular/core';
import { Event } from '../models/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  getEvents(): Event[] {
    return [{
      title: 'jam in raval',
      description: 'night of music',
      musicStyle: 'jazz',
      space: null,
      group: {
        name: 'capros',
        musicians:[]
      },
      date: new Date()
    }];
  }
}
