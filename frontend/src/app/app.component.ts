import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from "./pages/nav-bar/nav-bar.component";
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'jam-it';

  constructor (private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkAuthStatus();  // Verificar el estado de autenticación al cargar la app
  }
}
