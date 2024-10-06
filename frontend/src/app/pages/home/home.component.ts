import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventListComponent } from './event-list/event-list.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventListComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 

  

  cards = [
    {
      title: 'Start as a musician',
      description: 'Musician? Register, create a group with your friends and join jams around you!',
      role: 'musician'
    },
    {
      title: 'Start as a space',
      description: 'Have a space? Register your space and let musicians apply and play music in your space',
      role: 'venue'
    }
  ]
}
