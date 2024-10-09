import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';  // Importación moderna
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_COOKIE_NAME = 'token';  // Nombre del token en las cookies

  constructor(private http: HttpClient) {}

  private apiUrl = 'https://http://localhost:3000/auth/register';  // URL del backend

  register(credentials: { name: string ,email: string, password: string, role: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);  // Enviar POST al backend con los datos del formulario
  }

  // Función para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    const token = Cookies.get(this.TOKEN_COOKIE_NAME);  // Recuperamos el token desde las cookies

    if (!token) {
      return false;  // Si no hay token, el usuario no está logueado
    }

    try {
      const decodedToken: any = jwtDecode(token);  // Decodificamos el token JWT
      const expirationTime = decodedToken.exp * 1000;  // El tiempo de expiración está en segundos, lo multiplicamos por 1000 para convertirlo a milisegundos

      if (Date.now() > expirationTime) {
        return false;  // Si el token ha expirado, el usuario no está logueado
      }

      // Si el token es válido, podemos comprobar el rol si es necesario
      return true;  // Aquí podrías verificar roles si quieres, pero por ahora solo estamos verificando el token
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return false;  // Si hay un error decodificando el token, asumimos que el usuario no está logueado
    }
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
