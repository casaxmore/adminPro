import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medicos.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    }
  }

  cargarMedicos() {
    const url = `${base_url}/medicos`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => resp.medicos)
      )
  }

  crearMedico(medico: any) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);
  }

  actualizarMedico(_id: string, medico: Medico) {
    const url = `${base_url}/hospitales/${ medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  borrarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
