import { Component } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { RoutesEnum } from '../../shared/models/routes.enum';

@Component({
  selector: 'app-musician-view',
  standalone: true,
  imports: [CommonModule, RouterModule, CreateGroupFormComponent],
  templateUrl: './musician-view.component.html',
  styleUrl: './musician-view.component.scss'
})
export class MusicianViewComponent {

  routesEnum = RoutesEnum;


}

