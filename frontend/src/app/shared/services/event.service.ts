import { Injectable } from '@angular/core';
import { ApplyEvent, Event } from '../models/event.interface';

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
        musicians: 'bill, john',
        description: 'band of jazz',
        genre: 'jazz'
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
        musicians: 'Joe, maria',
        description: 'band of blues',
        genre: 'blues'
      },
      date: new Date()
    }];
  }

  getApplyEvents(): ApplyEvent[] {
    return [{
      name: 'Night concert',
      description: 'full band for a night dancing show (max 5 musicians)',
      payment: 500,
      event_type: 'rock',
      f_ini: new Date,
      f_end: new Date,
      date_end_bid: new Date,
      price: 10 
  },
  {
    name: 'Afternoon vermouth',
    description: 'intimate concert',
    payment: 250,
    event_type: 'jazz, bossa, blues',
    f_ini: new Date,
    f_end: new Date,
    date_end_bid: new Date,
    price: 12
}
    ]
  }
}
