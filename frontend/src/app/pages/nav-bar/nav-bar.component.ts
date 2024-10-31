import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Cookies from 'js-cookie';
import { RoleEnum } from '../../shared/models/roles.enum';
import { CommonModule } from '@angular/common';
import { RoutesEnum } from '../../shared/models/routes.enum';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  roleEnum = RoleEnum
  routesEnum = RoutesEnum
  isLoggedIn: boolean = false;
  eventOrGroup: string = null
  eventCreateView: string = null

  isMenuOpen: boolean;

  userRole$ = this.authService.userRole$


  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });


  }


  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Sesión cerrada exitosamente:', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Error al cerrar sesión:', err);
      }
    });
  }
}