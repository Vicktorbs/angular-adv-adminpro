import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medic } from '../models/medic.model';
import { Usuario } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

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

  private transformUser(results: any[]): Usuario[] {
    return results.map(
      user => new Usuario(user.name, user.email, '', user.img, user.google, user.role, user.uid)
    )
  }

  private transformHospital(results: any[]): Hospital[] {
    return results.map(
      hospital => new Hospital(hospital.name, hospital._id, hospital.img, hospital.user)
    )
  }

  private transformMedic(results: any[]): Medic[] {
    return results
  }

  searchAll(termin: string) {
    const url = `${ base_url }/todo/${ termin }`;
    return this.http.get(url, this.headers);
  }

  search(type: 'users'|'medics'|'hospitals',
        termin: string) {
    const url = `${ base_url }/todo/collection/${ type }/${ termin }`;
    return this.http.get<any>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.transformUser(resp.results)
            
          case 'hospitals':
            return this.transformHospital(resp.results)
            break;
            
            case 'medics':
              return this.transformMedic(resp.results)
              break;
        
          default:
            return [];
        }
      })
    )
  }

}
