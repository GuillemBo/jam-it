import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { RouterModule } from '@angular/router';
import Cookies from 'js-cookie';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
  ngOnInit(): void {
    console.log(this.isLoggedIn())
    console.log(Cookies.get('token')); 
  }
}