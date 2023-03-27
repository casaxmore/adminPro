import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Lo que hace es lanzar un efecto secundario, paso adicional
import { tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  crearUsuario(formData: RegisterForm) {
    console.log('Creando usuario', formData.nombre);
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('tokenCrear', resp.token);
      })
    );
  }

  login(formData: any) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('tokenLogin', resp.token);
      })
    );
  }
}
