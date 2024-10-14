import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HomeComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  registerRole: string = ''
  errorMessage: string
  roles = [{role: 'musician'}, {role: 'venue'}]
  logInForm: FormGroup = this.fb.group({})
  isAuthenticated: boolean = false;
  userData: any = null;
  isLoggedIn: boolean;

  constructor (private fb: FormBuilder, private _route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.logInForm = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.minLength(5)]),
    })
  }

  ngOnInit(): void {
    this.registerRole = this._route.snapshot.queryParamMap.get('role')
  }

  onSubmit(): void {
    if (this.logInForm.valid) {
      const formData = this.logInForm.value;

      // Llamada al servicio para enviar el POST al backend
      this.authService.login(formData).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);

          const userRole = response.data.user.role;

          // Actualiza el rol en el BehaviorSubject
          this.authService.updateUserRole(userRole);

          this.authService.redirectUser(userRole);
        },
        error: (error) => {
          console.error('Error al enviar el formulario', error);
          this.errorMessage = error.error.message
        }
    });
    } else {
      console.log('Formulario inválido');
    }
  }
  
  
  get email(){
    return this.logInForm.get('email')
  }

  get password(){
    return this.logInForm.get('password')
  }
}
