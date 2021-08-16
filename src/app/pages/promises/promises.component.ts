import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(users => {
      console.log(users);
      
    })
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hello world')
    //   } else {
    //     reject('Something wrong')
    //   }
    // })

    // promesa.then((mensaje) => {
    //   console.log(mensaje);
      
    // }).catch(error => console.log('Promise error', error))
    
    // console.log('End init');
  }

  getUsers() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    })
    
  }
}
