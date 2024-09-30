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
    },
    {
      title: 'jam in gòtic',
      description: 'night of music',
      musicStyle: 'blues',
      space: null,
      group: {
        name: 'blue band',
        musicians:[]
      },
      date: new Date()
    }];
  }
}
