import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.userService.user.name, Validators.required],
      email: [this.userService.user.email, [Validators.required, Validators.email]]
    })
  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value).subscribe(resp => {
      // Se podria sacar la info de la respuesta, tambien 
      const { name, email } = this.profileForm.value
      this.userService.user.name = name;
      this.userService.user.email = email;
    })
  }

}
