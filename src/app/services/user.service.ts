import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/user.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: Usuario

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '964450415537-vusrn6vi0p5aqrph8lrbtbugmm64agqp.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        
        resolve();
      });

    })
  }

  logout() {
    localStorage.removeItem('token');
    
    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
      
    });
  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, name, img = '', google, role, uid } = resp.user;
        this.user = new Usuario(name, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    )
  }

  createUser(formData: RegisterForm) {
    
    return this.http.post(`${ base_url }/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );

  }

  updateProfile(data: { email: string, name: string, role: string }) {
    data = {
      ...data,
      role: this.user.role
    }
    return this.http.put(`${ base_url }/users/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  loginUser(formData: LoginForm) {

    return this.http.post(`${ base_url }/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );

  }

  loginUserGoogle(token) {

    return this.http.post(`${ base_url }/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );

  }

  loadUsers(range: number = 0) {
    const url = `${ base_url }/users/?range=${ range }`;
    // Se puede crear una interfas para definir lo que devuelve la peticion y cambiar el any
    return this.http.get<any>(url, this.headers).pipe(
      delay(400),
      map(resp => {
        const users = resp.users.map(
          user => new Usuario(user.name, user.email, '', user.img, user.google, user.role, user.uid)
        )
        return {
          total: resp.totalRecords,
          users: users
        }
      })
    )
  }

}
