import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateGroupFormComponent } from '../musician-view/create-group-form/create-group-form.component';

@Component({
  selector: 'app-space-view',
  standalone: true,
  imports: [CommonModule, RouterModule, CreateGroupFormComponent],
  templateUrl: './space-view.component.html',
  styleUrl: './space-view.component.scss'
})
export class SpaceViewComponent {

}
