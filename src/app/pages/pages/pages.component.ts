import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
    const themeUrl = localStorage.getItem('theme') || './assets/css/colors/red-dark.css'
    this.linkTheme.setAttribute('href', themeUrl);
  }

}
