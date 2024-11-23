import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { VenueService } from '../../../shared/services/venue.service';
import { CommonModule, NgClass } from '@angular/common';
import { ApplicationService } from '../../../shared/services/application.service';
import { take } from 'rxjs';
import { StatusEnum } from '../../../shared/models/status.enum';

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.scss'
})
export class EventViewComponent implements OnInit {

  statusEnum= StatusEnum;

  userId$ = this._authService.userId$;
  venues$ = this._venueService.getUserVenues$()

  openedMenus: number[] = [];

  constructor (private _authService: AuthService, 
  private _venueService:VenueService, 
  private _applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadVenuesByUserId()
    console.log(this.venues$);
    
  }


  updateApplicationStatus(applicationId: string, status: string) {
    this._applicationService.updateApplicationStatus(applicationId, status)
  .pipe(take(1)     
    ).subscribe(() => {
      this.loadVenuesByUserId();
    });
  }

  loadVenuesByUserId():void {
    this.userId$.pipe(take(1)).subscribe(userId => {
      this._venueService.loadVenuesByUserId(userId)
    })
  }

  toggleMenu(id: number): void {
    if (this.isMenuOpen(id)){
      this.openedMenus = this.openedMenus.filter(openedMenuId => openedMenuId !== id)
    } else {
      this.openedMenus.push(id)
    }
  }

  isMenuOpen(id: number):boolean {
    return this.openedMenus.findIndex(openedMenuId => openedMenuId === id) !== -1
  }

}
