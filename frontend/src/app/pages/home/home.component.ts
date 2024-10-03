import { Component } from '@angular/core';
import { EventListComponent } from './event-list/event-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  cards = [
    {
      title: 'Start as a musician',
      description: 'Musician? Register, create a group with your friends and join jams around you!'
    },
    {
      title: 'Start as a space',
      description: 'Have a space? Register your space and let musicians apply and play music in your space'
    }
  ]
}
