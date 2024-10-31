import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CreateEventService } from '../../../shared/services/create-event.service';
import { VenueService } from '../../../shared/services/venue.service';
import { filter, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent implements OnInit {
  registerEventForm: FormGroup = this.fb.group({});
  errorMessage: string;
  userId$ = this.authService.userId$;
  venues$ = this.authService.userId$.pipe(
    filter(u => !!u),
    switchMap(userId => this.venueService.getVenuesByUserId(userId))
  )
  event: any;
  
  constructor (private authService: AuthService, private _route: ActivatedRoute, private router: Router, private fb: FormBuilder, private createEventService: CreateEventService, private venueService: VenueService) {
    this.registerEventForm = this.fb.group({
      name: new FormControl ('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      f_ini: new FormControl ('', [Validators.required]),
      f_end: new FormControl ('', [Validators.required]),
      event_type: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      date_end_bid: new FormControl ('', [Validators.required]),
      payment: new FormControl ('', [Validators.required]),
      price: new FormControl ('', [Validators.required]),
      id_venue: new FormControl ('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }


  onSubmit(): void {
    if (this.registerEventForm.valid) {
      const formData = this.registerEventForm.value;

      this.createEventService.createEvent(formData).subscribe({
        next: (response) => {
          console.log('Evento creado', response);

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al crear el Evento', error);
          this.errorMessage = error.error.message
        }
    });
    } else {
      console.log('Formulario inválido');
    }
  }

}

