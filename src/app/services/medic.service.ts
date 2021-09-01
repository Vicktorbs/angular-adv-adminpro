import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medic } from '../models/medic.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadMedics() {
    const url = `${ base_url }/medics`;
    // Se puede crear una interfas para definir lo que devuelve la peticion y cambiar el any
    return this.http.get(url, this.headers).pipe(
      map((resp: {ok: boolean, medics: Medic[]}) => resp.medics)
    )
  }

  createMedics(medic: Medic) {
    const url = `${ base_url }/medics`;
    // Se puede crear una interfas para definir lo que devuelve la peticion y cambiar el any
    return this.http.post(url, medic, this.headers);
  }

  updateMedics(medic: Medic) {
    const url = `${ base_url }/hospitals/${ medic._id }`;
    // Se puede crear una interfas para definir lo que devuelve la peticion y cambiar el any
    return this.http.put(url, medic, this.headers);
  }

  deleteMedics(_id: string) {
    const url = `${ base_url }/medics/${ _id }`;
    // Se puede crear una interfas para definir lo que devuelve la peticion y cambiar el any
    return this.http.delete(url, this.headers);
  }

}
