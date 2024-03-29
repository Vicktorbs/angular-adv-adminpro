import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: [];

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/' },
  //       { title: 'ProgressBar', url: 'progress' },
  //       { title: 'Promises', url: 'promises' },
  //       { title: 'rxjs', url: 'rxjs' },
  //       { title: 'Graphic', url: 'grafica1' }
  //     ]
  //   },
  //   {
  //     title: 'Maintenance',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Users', url: 'users' },
  //       { title: 'Hospitals', url: 'hospitals' },
  //       { title: 'Medics', url: 'medics' }
  //     ]
  //   }
  // ]

  constructor() { }
}
