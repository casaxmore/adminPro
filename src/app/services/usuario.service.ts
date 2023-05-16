import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
// Lo que hace es lanzar un efecto secundario, paso adicional
import { catchError, delay, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    }
  }

  validarToken(): Observable<boolean> {

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          console.log('Resultado:', resp);
          const { email, google, nombre, role, img = '', uid } = resp.usuario;

          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

          /* localStorage.setItem('menu', JSON.stringify(resp.menu)); */
          localStorage.setItem('token', resp.token);
          return true;
        }),
        /* map((resp) => true), */
        // El operador of nos permite crear un Observable en base al valor que pongamos
        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    console.log('Creando usuario', formData.nombre);
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('menu', JSON.stringify(resp.menu));
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarPerfil(data: {email: string, nombre: string, role: any}){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  login(formData: any) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('menu', JSON.stringify(resp.menu));
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        console.log(resp);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    // Salir de la cuenta google
    google.accounts.id.revoke('casaxmore@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
    this.router.navigateByUrl('/login');
  }

  cargarUsuarios(desde: number = 0) {
    // http://localhost:3000/api/usuarios?desde=5
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
        .pipe(
          /* delay(5000), */
          map(resp => {
            const usuarios = resp.usuarios.map( user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
            );
            return {
              total: resp.total,
              usuarios
            };
          })
        )
  }

  eliminarUsuaurio(usuario: Usuario){
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario){

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}
