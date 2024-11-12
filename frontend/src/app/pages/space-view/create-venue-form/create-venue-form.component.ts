import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpaceViewComponent } from '../space-view.component';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateVenueService } from '../../../shared/services/create-venue.service';
import { ToastrService } from 'ngx-toastr';
import { VenueService } from '../../../shared/services/venue.service';
import { RoutesEnum } from '../../../shared/models/routes.enum';

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
  userId: number = null;
  isEditMode: boolean = false;
  venueId: number
  
  constructor (private authService: AuthService,
    private _route: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder, 
    private _createVenueService: CreateVenueService,
    private toastr: ToastrService,
    private _venueService: VenueService
  ) {

    this._route.paramMap.subscribe(params => {
      const venueId = params.get('id');
      if (venueId) {
        this.venueId = +venueId;
        this.isEditMode = true;
        this.loadVenueData(this.venueId);
      }
    });

    this.registerVenueForm = this.fb.group({
      id_user: new FormControl ('', Validators.required),
      title: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      address: new FormControl ('', [Validators.required]),
      capacity: new FormControl ('', [Validators.required])
    })
  }
  

  ngOnInit(): void {
    this.authService.userId$.subscribe((userId: number) => {
      this.userId = userId;
      console.log("id user:", this.userId);
    });
    this.registerVenueForm.patchValue({ id_user: this.userId });
  }

  private loadVenueData(id: number) {
    this._venueService.getVenueById$(id).subscribe(venue => {
      this.registerVenueForm.patchValue(venue);
    });
  }


  onSubmit(): void {
    if (this.registerVenueForm.valid) {
      const formData = this.registerVenueForm.value;

      if (this.isEditMode) {
        // Modo Edición
        this._createVenueService.updateVenue(this.venueId, formData).subscribe({
          next: (response) => {
            this.toastr.success('Venue updated successfully');
            this.router.navigate([RoutesEnum.VENUEVIEW]); // Navega a la lista de venues
          },
          error: (error) => {
            this.errorMessage = error.error.message;
            this.toastr.warning('Error updating venue');
          }
        });

      } else {

      this._createVenueService.createVenue(formData).subscribe({
        next: (response) => {
          console.log('Venue creado', response);
          this.toastr.success(`Venue has been created successfully`);
          this.router.navigate([RoutesEnum.VENUEVIEW]);
        },
        error: (error) => {
          console.error('Error al crear el venue', error);
          this.errorMessage = error.error.message
          this.toastr.warning(`An error ocurred while creating the venue`);
        }
    });
  }
    } else {
      console.log('Formulario inválido');
      this.toastr.warning(`An error ocurred while creating the venue`);
    }
  }
}
