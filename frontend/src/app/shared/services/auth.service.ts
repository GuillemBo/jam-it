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


  constructor(private http: HttpClient, private router: Router) {}
  
  private apiUrl = 'http://localhost:3000/auth';
  private readonly TOKEN_COOKIE_NAME = 'token';  // Nombre del token en las cookies

  register(credentials: { name: string ,email: string, password: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials,{ withCredentials: true }); 
  }

  login(credentials: { email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true })
  }

  verifyAuth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify-auth`, { withCredentials: true });
  }


  logout(): Observable<any> {
    // Hacemos la solicitud al backend para que el servidor elimine la cookie
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        map(response => {
          // Aquí puedes manejar la respuesta si el backend devuelve algo
          console.log('Logout exitoso', response);
          return response;
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<{ message: string, data: any, error?: boolean }>(`${this.apiUrl}/verify-auth`, { withCredentials: true })
      .pipe(
        map(response => {
          // Si la respuesta no tiene errores, significa que el token es válido
          return response && response.data && !response.error;
        })
      );
  }

  // Puedes agregar una función para obtener el rol del usuario desde el token si es necesario
  getUserRole(): string | null {
    const token = Cookies.get(this.TOKEN_COOKIE_NAME);
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role;  // Asumiendo que el rol está en el token decodificado
    } catch (error) {
      console.error('Error al obtener el rol del token', error);
      return null;
    }
  }
  
}
