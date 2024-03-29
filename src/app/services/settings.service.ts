import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public linkTheme = document.querySelector('#theme');

  constructor() { 
    const themeUrl = localStorage.getItem('theme') || './assets/css/colors/red-dark.css'
    this.linkTheme.setAttribute('href', themeUrl);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    // this.checkCurrentTheme();
  }

  checkCurrentTheme(links) {

    // const links = document.querySelectorAll('.selector');

    links.forEach(elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    })
  }

}
