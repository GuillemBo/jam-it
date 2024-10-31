import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CreateEventService } from '../../../shared/services/create-event.service';
import { VenueService } from '../../../shared/services/venue.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent implements OnInit {
  registerEventForm: FormGroup = this.fb.group({});
  errorMessage: string;
  userId: number = null;
  venues: any[] = [];
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
    this.authService.userId$.subscribe((userId: number) => {
      this.userId = userId;
      console.log("id user:", this.userId);
    });
    this.getVenuesByUserId()
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

  getVenuesByUserId() {
    this.venueService.getVenuesByUserId().subscribe({
      next: (response) => {
        this.venues = response.data.filter(venues => venues.id_user == this.userId)
        console.log(`Venues con el id ${this.userId}:`, this.venues);
      },
      error: (err) => {
        console.log('Error al buscar las venues:', err);
      }
    });
  }
}

