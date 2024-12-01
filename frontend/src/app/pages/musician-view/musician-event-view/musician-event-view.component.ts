import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../shared/services/group.service';
import { StatusEnum } from '../../../shared/models/status.enum';
import { AuthService } from '../../../shared/services/auth.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../shared/services/application.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-musician-event-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './musician-event-view.component.html',
  styleUrl: './musician-event-view.component.scss'
})
export class MusicianEventViewComponent implements OnInit {

  statusEnum= StatusEnum;

  userId$ = this._authService.userId$;
  groups$ = this._groupService.getUserGroups$()

  constructor (private _authService: AuthService, 
    private _groupService:GroupService,
    private _applicationService: ApplicationService,
    private _toastr: ToastrService) {}

    ngOnInit(): void {
      this.loadGroupsByUserId()
      console.log(this.groups$);
      console.log(this.userId$);
      
    }


    loadGroupsByUserId():void {
      this.userId$.pipe(take(1)).subscribe(userId => {
        this._groupService.loadGroupsByUserId(userId)
      })
    }

    deleteApplication(applicationId: number): void {
      if (confirm('seguro que quieres eliminar application?') == true) {
        this._applicationService.deleteApplicationById(applicationId).subscribe(data => {
          console.log(data)
          this._toastr.warning('El producto fue eliminado con éxito', 'Producto eliminado')
          this.userId$.pipe(take(1)).subscribe(userId => {
            this._groupService.loadGroupsByUserId(userId)
          })
        }
      )}
    }

}
