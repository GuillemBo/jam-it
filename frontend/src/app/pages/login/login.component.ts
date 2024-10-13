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
    this.checkAuthentication();
    this.authService.isLoggedIn().subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn;// Forzar la detección de cambios aquí
      },
      error: () => {
        this.isLoggedIn = false;
      }
    });
  }

  onSubmit(): void {
    if (this.logInForm.valid) {
      const formData = this.logInForm.value;
      console.log(formData)

      // Llamada al servicio para enviar el POST al backend
      this.authService.login(formData).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          this.checkAuthentication();
          this.router.navigate(['/']);
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

  checkAuthentication(): void {
    this.authService.verifyAuth().subscribe({
      next: (response) => {
        console.log('Usuario autenticado', response);
        this.isAuthenticated = true;
        this.userData = response.user;  // Aquí guardamos la info del usuario
        // this.redirectUser()
      },
      error: (error) => {
        console.log('Usuario no autenticado', error);
        this.isAuthenticated = false;
      }
    });
  }
  
  
  redirectUser(): void {
    if (this.registerRole) {
      // Si tenemos un rol en los parámetros de la URL, lo redirigimos a la ruta adecuada
      if (this.registerRole === 'musician') {
        this.router.navigate(['/musician-dashboard']);  // Redirigir al dashboard del músico
      } else if (this.registerRole === 'venue') {
        this.router.navigate(['/venue-dashboard']);  // Redirigir al dashboard del lugar
      }
    } else {
      // Si no hay rol en los query params, redirigimos a la página principal o a un dashboard genérico
      this.router.navigate(['/dashboard']);
    }
  }

  get email(){
    return this.logInForm.get('email')
  }

  get password(){
    return this.logInForm.get('password')
  }
}
