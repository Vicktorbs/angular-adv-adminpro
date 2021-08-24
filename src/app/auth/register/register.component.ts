import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public submitedForm =false;
  public registerForm = this.fb.group({
    name: ['Yoana', Validators.required],
    email: ['yoana@gmail.com', [Validators.required, Validators.email]],
    password: ['Yoana', Validators.required],
    password2: ['Yoana', Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.passwordsEq('password', 'password2')
  })

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.submitedForm = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    } 

    // Posting data
    this.userService.createUser(this.registerForm.value).subscribe(resp => {
      // Navigate to dasboard
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.submitedForm) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.submitedForm
  }

  passwordsEquals() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.submitedForm) {
      return true;
    } else {
      return false;
    }
  }

  passwordsEq(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control =formGroup.get(pass1Name);
      const pass2Control =formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

}
