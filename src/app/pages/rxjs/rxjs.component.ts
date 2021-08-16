import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
    
    // this.returnObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.log('Error ', error),
    //   () => console.log('Obs terminado')
    // )
    this.intervalSubs = this.returnInterval().subscribe(console.log)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }

  returnInterval(): Observable<number> {
    const interval$ = interval(500)
                      .pipe(
                        map(value => value + 1),
                        filter(value => (value % 2 === 0)? true: false),
                        // take(10)
                      );
    return interval$;
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
