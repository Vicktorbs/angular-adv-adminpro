import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: Usuario;

  constructor(private userService: UserService,
              private router: Router) {
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }

  searchAll(termin: string) {
    
    if (termin.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/search/${ termin }`);
  }

}
