import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs';
import { Hospital } from '../models/hospitales.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaHospitalService {

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

  private transformarHospitales (resultados: any[]): Hospital[] {
    return resultados
  }

  buscar(
    tipo: 'usuarios'|'medicos'|'hospitales',
    terminos: string
    ) {
    const url = `${base_url}/todo/coleccion/${tipo}/${terminos}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( (resp: any) => {
          console.log(resp);
          return this.transformarHospitales(resp.resultados);
        })
      )
  }
}
