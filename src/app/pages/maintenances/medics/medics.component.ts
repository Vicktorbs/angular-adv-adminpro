import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medic } from 'src/app/models/medic.model';
import { MedicService } from 'src/app/services/medic.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit, OnDestroy {

  public medics: Medic[] = [];
  public medicsTemp: Medic[] = [];
  public loading: boolean = true;
  public imgSub: Subscription;

  constructor(private medicService: MedicService,
              private modalImagenService: ModalImagenService,
              private searchService: SearchesService) { }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadMedics();
    this.imgSub = this.modalImagenService.newImagen.pipe(
      delay(100)
    ).subscribe(
      img => this.loadMedics()
    );
  }
  
  loadMedics() {
    this.loading = true;
    this.medicService.loadMedics().subscribe(
      resp => {
        this.medics = resp;
        this.medicsTemp = resp;
        this.loading = false;
      }
    )
  }

  deleteMedic(medic: Medic) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are trying to delete: ${ medic.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicService.deleteMedics(medic._id).subscribe(
          resp => {
            this.loadMedics();
            Swal.fire('Deleted', `Medic '${ medic.name }' was delete`, 'success');
          }
        )
      }
    })
    
  }

  openModal(medic: Medic) {
    this.modalImagenService.openModal('medics', medic._id, medic.img);
  }

  search(termin: string) {
    if (termin.length === 0) {
      return this.medics = this.medicsTemp;
    }
    this.searchService.search('medics', termin).subscribe(
      (resp: Medic[]) => {
        this.medics = resp;
      }
      
    )
  }

}
