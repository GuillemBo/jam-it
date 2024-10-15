import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../shared/services/group.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.scss'
})
export class GroupViewComponent implements OnInit {

  eventsToApply = this._eventService.getApplyEvents();
  userId: string | null = null;

  constructor (private _eventService: EventService, private groupService: GroupService, private authService: AuthService){}

  ngOnInit(): void {
    this.authService.userId$.subscribe((userId: string | null) => {
      this.userId = userId;
      console.log("id user:", this.userId);
    });
  }


  getGroupsByUserId() {
    this.groupService.getGroupsByUserId().subscribe({
      next: (response) => {
        console.log(`Grupos con el id ${this.userId}:`, response);
        if (response.userId == this.userId){
          response
        }
      },
      error: (err) => {
        console.log('Error al buscar los grupos:', err);
      }
    });
  }

}
