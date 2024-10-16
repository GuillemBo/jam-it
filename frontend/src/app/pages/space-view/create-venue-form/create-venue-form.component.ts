import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpaceViewComponent } from '../space-view.component';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateVenueService } from '../../../shared/services/create-venue.service';

@Component({
  selector: 'app-create-venue-form',
  standalone: true,
  imports: [ReactiveFormsModule, SpaceViewComponent],
  templateUrl: './create-venue-form.component.html',
  styleUrl: './create-venue-form.component.scss'
})
export class CreateVenueFormComponent implements OnInit {
  registerVenueForm: FormGroup = this.fb.group({});
  errorMessage: string;
  userId: string | null = null;
  
  constructor (private authService: AuthService, private _route: ActivatedRoute, private router: Router, private fb: FormBuilder, private createVenueService: CreateVenueService) {
    this.registerVenueForm = this.fb.group({
      id_user: new FormControl ('', Validators.required),
      title: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      address: new FormControl ('', [Validators.required]),
      capacity: new FormControl ('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.authService.userId$.subscribe((userId: string | null) => {
      this.userId = userId;
      console.log("id user:", this.userId);
    });
    this.registerVenueForm.patchValue({ id_user: this.userId });
  }


  onSubmit(): void {
    if (this.registerVenueForm.valid) {
      const formData = this.registerVenueForm.value;

      this.createVenueService.createVenue(formData).subscribe({
        next: (response) => {
          console.log('Venue creado', response);

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al crear el venue', error);
          this.errorMessage = error.error.message
        }
    });
    } else {
      console.log('Formulario inválido');
    }
  }
}
