import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../shared/services/group.service';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationService } from '../../../shared/services/application.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.scss'
})
export class GroupViewComponent implements OnInit {

  eventsToApply: any[] = [];
  userId: number = null;
  userId$ = this._authService.userId$;
  groups$ = this._groupService.getUserGroups$()

  applicationForm: FormGroup = this.fb.group({});

  selectedGroupId: number | null = null; // Para almacenar el grupo seleccionado
  showGroupSelect: { [id_event: number]: boolean } = {};
  titulodeloquehago: string
  descriptiondeloquehago: string

  constructor (private _eventService: EventService, 
    private _applicationService: ApplicationService, 
    private _groupService: GroupService, 
    private _authService: AuthService, 
    private fb: FormBuilder, 
    private _router: Router,
    private _toastr: ToastrService){
    this.applicationForm = this.fb.group({
      id_event: new FormControl ('', Validators.required),
      id_group: new FormControl ('', Validators.required),
      titulodeloquehago: new FormControl ('', [Validators.required]),
      descriptiondeloquehago: new FormControl ('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this._authService.userId$.subscribe((userId: number) => {
      this.userId = userId;
      console.log("id user:", this.userId);
    });
    this.userId$.pipe(take(1)).subscribe(userId => {
      this._groupService.loadGroupsByUserId(userId)
    })
    this.getEventsToApply()
  }


  getEventsToApply(){
    this._eventService.getEventsByVenueId().subscribe({
      next: (response) => {
        this.eventsToApply = response;
        console.log('Eventos disponibles', this.eventsToApply);
      },
      error: (error) => {
        console.error('Error al obtener eventos con aplicaciones:', error);
      },
    });
  }

  // Mostrar desplegable de grupos
  toggleGroupSelect(id_event: number): void {
    this.showGroupSelect[id_event] = !this.showGroupSelect[id_event]; // Toggle para mostrar el desplegable
    this.applicationForm.patchValue({ id_event: id_event });
  }

  // Método para aplicar al evento
  confirmApplication(): void { 
    if (this.applicationForm.invalid) {
      console.error('Formulario inválido');
      return;
    }
    
    const formData = this.applicationForm.value;

    this._applicationService.applyToEvent(formData).subscribe({
      next: (response) => {
        console.log('Aplicación exitosa:', response);
      },
      error: (err) => {
        console.error('Error al aplicar al evento:', err);
      }
    });

    console.log(formData)
  }



  editGroup(id_group: number): void {
    this._router.navigate(['/groups/edit', id_group]); // Redirige a la ruta de edición
  }

  deleteGroup(id_group: number): void {
    if (confirm('seguro que quieres eliminar grupo?') == true) {
    this._groupService.deleteGroupById(id_group).subscribe(data => {
      console.log(data)
      this._toastr.warning('El grupo fue eliminado con éxito', 'Grupo eliminado')
      this.userId$.pipe(take(1)).subscribe(userId => {
        this._groupService.loadGroupsByUserId(userId)
      })
    }
  )}
}
}
