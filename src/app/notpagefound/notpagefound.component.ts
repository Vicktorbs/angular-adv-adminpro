import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notpagefound',
  templateUrl: './notpagefound.component.html',
  styleUrls: ['./notpagefound.component.css']
})
export class NotpagefoundComponent implements OnInit {

  year = new Date().getFullYear()

  constructor() { }

  ngOnInit(): void {
  }

}
