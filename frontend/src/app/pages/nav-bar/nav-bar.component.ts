import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Cookies from 'js-cookie';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean = false;


  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    // Suscribirse a isLoggedIn y actualizar la variable
    this.authService.isLoggedIn().subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn;
        console.log('Estado de autenticación:', loggedIn);
      },
      error: (error) => {
        console.log('Error al verificar autenticación:', error);
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Sesión cerrada exitosamente:', response);
        // Actualiza el estado de autenticación
        this.isLoggedIn = false;

        // Redirige al usuario a la página de inicio de sesión u otra página
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Error al cerrar sesión:', err);
      }
    });
  }


}