import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../shared/services/group.service';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationService } from '../../../shared/services/application.service';

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
  groups: any[] = [];

  applicationForm: FormGroup = this.fb.group({});

  selectedGroupId: number | null = null; // Para almacenar el grupo seleccionado
  showGroupSelect: { [id_event: number]: boolean } = {};
  titulodeloquehago: string
  descriptiondeloquehago: string

  constructor (private _eventService: EventService, private _applicationService: ApplicationService , private groupService: GroupService, private authService: AuthService, private fb: FormBuilder){
    this.applicationForm = this.fb.group({
      id_event: new FormControl ('', Validators.required),
      id_group: new FormControl ('', Validators.required),
      titulodeloquehago: new FormControl ('', [Validators.required]),
      descriptiondeloquehago: new FormControl ('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.authService.userId$.subscribe((userId: number) => {
      this.userId = userId;
      console.log("id user:", this.userId);
    });
    this.getGroupsByUserId()
    this.getEventsToApply()
  }


  getGroupsByUserId() {
    this.groupService.getGroupsByUserId().subscribe({
      next: (response) => {
        this.groups = response.data.filter(groups => groups.id_user == this.userId)
        console.log(`Grupos con el id user ${this.userId}:`, this.groups);
      },
      error: (err) => {
        console.log('Error al buscar los grupos:', err);
      }
    });
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
}
