import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() {
    

    this.returnObservable().pipe(
      retry()
    ).subscribe(
      valor => console.log('Subs: ', valor),
      error => console.log('Error ', error),
      () => console.log('Obs terminado')
    )
  }

  ngOnInit(): void {
  }

  returnObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i == 2) {
          observer.error('i es igual a 2');
        }
      }, 1000)
    });
    return obs$;
  }

}
