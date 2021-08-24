import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public submitedForm =false;
  public auth2: any;
  // yoana@gmail.com
  // Yoana
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [localStorage.getItem('remember') || false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.userService.loginUser(this.loginForm.value).subscribe(resp => {
      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
        localStorage.setItem('remember', this.loginForm.get('remember').value);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('remember');
      }
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
    // this.router.navigateByUrl('/');
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '964450415537-vusrn6vi0p5aqrph8lrbtbugmm64agqp.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_toke = googleUser.getAuthResponse().id_token;
        // console.log(id_toke);
        this.userService.loginUserGoogle(id_toke).subscribe()
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
