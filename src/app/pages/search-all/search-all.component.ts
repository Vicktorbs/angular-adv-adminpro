import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';
import { Usuario } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {

  public users: Usuario[] = [];
  public medics: Medic[] = [];
  public hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private searchService: SearchesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ({ termin }) => this.searchAll(termin)
      
    )
  }

  searchAll(termin: string) {
    this.searchService.searchAll(termin).subscribe(
      (resp: any) => {
        console.log(resp);
        this.users = resp.users;
        this.medics = resp.medics;
        this.hospitals = resp.hospitals;
      }
    )
  }

  openMecid(medic: Medic) {

  }

}
