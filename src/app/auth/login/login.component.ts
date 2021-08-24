import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public submitedForm =false;
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

}
