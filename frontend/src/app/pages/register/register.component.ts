import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { formatCurrency } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup = this.fb.group({})
  registerRole: string = ''
  
  constructor(private _route: ActivatedRoute, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      role: new FormControl ('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.registerRole = this._route.snapshot.queryParamMap.get('role') 
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Si el formulario es válido, obtenemos los datos
      const formData = this.registerForm.value;

      // Llamada al servicio para enviar el POST al backend
      this.authService.register(formData).subscribe(
        response => {
          console.log('Login exitoso', response);
          // Aquí puedes redirigir o hacer lo que necesites después de login exitoso
          this.router.navigate(['/home']);  // Redirigir a un dashboard, por ejemplo
        },
        error => {
          console.error('Error al enviar el formulario', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

}