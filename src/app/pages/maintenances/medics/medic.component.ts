import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicService } from 'src/app/services/medic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  public medicForm: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital: Hospital;
  public selectedMedic: Medic;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicService: MedicService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => this.loadMedic(id))

    this.medicForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.loadHospitals();

    this.medicForm.get('hospital').valueChanges.subscribe(
      hospitalId => {
        this.selectedHospital = this.hospitals.find(h => h._id === hospitalId);
      }
    )

  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe(
      (hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      }
    )
  }

  loadMedic(id: string) {
    if (id ===  'new') {
      return;
    }
    this.medicService.gettingMedicById(id).pipe(
      delay(100)
    ).subscribe(
      medic => {
        if (!medic) {
          this.router.navigateByUrl(`/dashboard/medics`);
          return;
        }
        const { name, hospital: { _id } } = medic;
        this.selectedMedic = medic;
        this.medicForm.setValue({name, hospital: _id});
      }
    )
  }

  saveMedic() {
    const { name } = this.medicForm.value;
    
    if (this.selectedMedic) {
      // Update
      const data = {
        ...this.medicForm.value,
        _id: this.selectedMedic._id
      }
      this.medicService.updateMedic(data).subscribe(
        resp => {
          Swal.fire('Created', `Medic '${ name}' Updated successfuly`, 'success');
        }
      )
    } else {
      // Create
      this.medicService.createMedics(this.medicForm.value).subscribe(
        (resp: any) => {
          Swal.fire('Created', `Medic '${ name}' created successfuly`, 'success');
          this.router.navigateByUrl(`/dashboard/medic/${ resp.medic._id}`);
        }
      )
    }

  }

}
