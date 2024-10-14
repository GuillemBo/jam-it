import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';  // Importación moderna
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userRole$: Observable<string | null> = this.userRoleSubject.asObservable();



  constructor(private http: HttpClient, private router: Router) {}
  
  private apiUrl = 'http://localhost:3000/auth';
  private readonly TOKEN_COOKIE_NAME = 'token';  // Nombre del token en las cookies

  register(credentials: { name: string ,email: string, password: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials,{ withCredentials: true }); 
  }

  login(credentials: { email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true })
    .pipe(
      map(response => {
        this.isLoggedInSubject.next(true);  // Actualiza el estado cuando el login es exitoso
        return response;
      })
    );
  }


  logout(): Observable<any> {
    // Hacemos la solicitud al backend para que el servidor elimine la cookie
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        map(response => {
          this.isLoggedInSubject.next(false);  // Actualiza el estado cuando se cierra sesión
          return response;
        })
      );
  }

  checkAuthStatus(): void {
    this.http.get<{ message: string, data: any, error?: boolean }>(`${this.apiUrl}/verify-auth`, { withCredentials: true })
      .pipe(
        map(response => {
          if (response && response.data && !response.error) {
            // Si la autenticación es válida, devuelve el estado de loggedIn y el rol
            return { loggedIn: true, role: response.data.role };  // Incluye el rol aquí
          } else {
            return { loggedIn: false, role: null };  // No autenticado
          }
        })
      ).subscribe({
        next: (authStatus: { loggedIn: boolean, role: string | null }) => {
          this.isLoggedInSubject.next(authStatus.loggedIn);  // Actualiza el estado de autenticación
          this.userRoleSubject.next(authStatus.role);  // Actualiza el estado del rol

          if (authStatus.loggedIn) {
            this.redirectUser(authStatus.role);  // Redirigir si está autenticado
          }
        },
        error: () => {
          this.isLoggedInSubject.next(false);
          this.userRoleSubject.next(null);  // Limpia el rol en caso de error
        }
      });
  }
  

  redirectUser(role: string | null): void {
    if (role) {
      if (role === 'musician') {
        this.router.navigate(['/musician']);
      } else if (role === 'venue') {
        this.router.navigate(['/venue']);
      }
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

    // Método para actualizar el rol del usuario en el BehaviorSubject
    updateUserRole(role: string | null): void {
      this.userRoleSubject.next(role);
    }
  
}
