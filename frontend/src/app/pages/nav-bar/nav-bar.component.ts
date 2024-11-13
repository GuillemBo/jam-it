import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Cookies from 'js-cookie';
import { RoleEnum } from '../../shared/models/roles.enum';
import { CommonModule } from '@angular/common';
import { RoutesEnum } from '../../shared/models/routes.enum';
import { UserService } from '../../shared/services/user.service';
import { filter, switchMap, take } from 'rxjs';
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
  userId$ = this._authService.userId$;
  user$ = this.userId$.pipe(
    filter(userId => !!userId), // Solo continua si hay un ID válido
    switchMap(userId => this._userService.getUserById$(userId))
  );


  constructor(private authService: AuthService, private router: Router, private _userService: UserService, private _authService: AuthService) { }


  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });  
    console.log(this.user$);
    
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