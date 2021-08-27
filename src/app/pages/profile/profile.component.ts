import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public imagenToUpload: File;
  public imgTemp: any = null;
  public userImg: any = null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fileUploadService: FileUploadService) {
    this.userImg = {
      img: userService.user.imageUrl,
      google: userService.user.google
    }
    
  }

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

      Swal.fire('Saved', 'Changes saved', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }

  changeImagen(file: File) {
    this.imagenToUpload = file;
    
    if (!file) {
      return this.imgTemp = null
    }
    const reader = new FileReader();
    
    reader.onloadend = () => {
      this.imgTemp  = reader.result;
    }
    reader.readAsDataURL(this.imagenToUpload)
    
  }

  uploadImagen() {
    this.fileUploadService.updatePhoto(this.imagenToUpload, 'users', this.userService.user.uid).then(
      img => {
        this.userService.user.img = img;
        Swal.fire('Saved', 'Imagen saved', 'success');
      }
    ).catch(err => {
      Swal.fire('Error', 'Imagen can not be saved', 'error');
    })
  }

}
