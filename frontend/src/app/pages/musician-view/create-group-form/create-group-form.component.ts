import { Component, OnInit } from '@angular/core';
import { MusicianViewComponent } from '../musician-view.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateGroupService } from '../../../shared/services/create-group.service';

@Component({
  selector: 'app-create-group-form',
  standalone: true,
  imports: [MusicianViewComponent, ReactiveFormsModule],
  templateUrl: './create-group-form.component.html',
  styleUrl: './create-group-form.component.scss'
})
export class CreateGroupFormComponent implements OnInit {

  registerGroupForm: FormGroup = this.fb.group({});
  errorMessage: string;
  userId: string | null = null;
  
  constructor (private authService: AuthService,private _route: ActivatedRoute, private router: Router, private fb: FormBuilder, private createGroupService: CreateGroupService) {
    this.registerGroupForm = this.fb.group({
      id_user: new FormControl ('', Validators.required),
      name: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      musicians: new FormControl ('', [Validators.required]),
      description: new FormControl ('', []),
      genre: new FormControl ('', [])
    })
  }

  ngOnInit(): void {
    this.authService.userId$.subscribe((userId: string | null) => {
      this.userId = userId;
      console.log("id user:", this.userId);
    });
    this.registerGroupForm.patchValue({ id_user: this.userId });
  }


  onSubmit(): void {
    if (this.registerGroupForm.valid) {
      const formData = this.registerGroupForm.value;

      this.createGroupService.createGroup(formData).subscribe({
        next: (response) => {
          console.log('Grupo creado', response);

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al crear el grupo', error);
          this.errorMessage = error.error.message
        }
    });
    } else {
      console.log('Formulario inválido');
    }
  }
}
