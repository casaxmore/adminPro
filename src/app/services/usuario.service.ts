import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
// Lo que hace es lanzar un efecto secundario, paso adicional
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || "";

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp:any) =>{
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      // El operador of nos permite crear un Observable en base al valor que pongamos
      catchError( error => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    console.log('Creando usuario', formData.nombre);
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: any) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp: any) => {
          console.log(resp);
          localStorage.setItem('token', resp.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');

    // Salir de la cuenta google
    google.accounts.id.revoke('juegosretrocsx@gmail.com', ()=> {
      this.router.navigateByUrl('/login');
    })
  }
}
