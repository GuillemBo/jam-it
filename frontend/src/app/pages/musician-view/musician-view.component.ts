import { Component } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-musician-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './musician-view.component.html',
  styleUrl: './musician-view.component.scss'
})
export class MusicianViewComponent {

  eventsToApply = this._eventService.getApplyEvents();

  constructor (private _eventService: EventService){}


}
