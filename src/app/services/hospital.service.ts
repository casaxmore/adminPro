import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs';
import { Hospital } from '../models/hospitales.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales() {
    // http://localhost:3000/api/usuarios?desde=5
    const url = `${base_url}/hospitales`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => resp.hospitales)
      )
  }
}
