import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenToUpload: File;
  public imgTemp: any = null;
  public userImg: any = null;

  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalImagenService.closeModal();
    this.imgTemp = null;
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
    const id = this.modalImagenService.id;
    const type = this.modalImagenService.type

    this.fileUploadService.updatePhoto(this.imagenToUpload, type, id).then(
      img => {
        Swal.fire('Saved', 'Imagen saved', 'success');
        this.modalImagenService.newImagen.emit(img);
        this.closeModal();
      }
    ).catch(err => {
      Swal.fire('Error', 'Imagen can not be saved', 'error');
    })
  }

}
