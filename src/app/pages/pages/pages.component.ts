import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private settingServices: SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
