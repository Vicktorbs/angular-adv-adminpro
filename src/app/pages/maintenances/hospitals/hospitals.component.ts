import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean = true;
  public imgSub: Subscription;

  constructor(private hospitalService: HospitalService,
              private searchService: SearchesService,
              private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSub = this.modalImagenService.newImagen.pipe(
      delay(100)
    ).subscribe(
      img => this.loadHospitals()
    );
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe(
      hospitals => {
        console.log('data');
        
        this.loading = false;
        this.hospitals = hospitals;
        this.hospitalsTemp = hospitals;
      }
    )
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital.name).subscribe(
      resp => {
        Swal.fire('Updated', hospital.name, 'success')
      }
    )
  }

  deleteChanges(hospital: Hospital) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are trying to delete: ${ hospital.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital._id).subscribe(
          resp => {
            this.loadHospitals();
            Swal.fire('Deleted', `Hospital '${ hospital.name }' was delete`, 'success');
          }
        )
      }
    })
    
  }

  async lauchSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      title: 'Create new hospital',
      inputLabel: 'Name hospital',
      inputPlaceholder: 'Enter the hospital name',
      showCancelButton: true
    })
    
    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe(
        (resp: any) => {
          this.hospitals.push(resp.hospital)
        }
      )
    }
  }

  openModal(hospital: Hospital) {
    this.modalImagenService.openModal('hospitals', hospital._id, hospital.img);
  }

  // localhost:3000/api/todo/collection/hospitals/v
  search(termin: string) {
    if (termin.length === 0) {
      return this.hospitals = this.hospitalsTemp;
    }
    this.searchService.search('hospitals', termin).subscribe(
      (resp: Hospital[]) => {
        this.hospitals = resp;
      }
      
    )
  }

}
