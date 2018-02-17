import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  suscription: Subscription;
  constructor() {
    this.suscription =  this.regresaObservable().subscribe(
      num => console.log('Subs ', num),
      error => console.error('Error ', error),
      () => console.log('Termino')
     );

  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  regresaObservable(): Observable <any> {
    return new Observable( observer => {
      let conta = 0;
      const intervalo = setInterval( () => {
        conta += 1;
        const salida = {
          valor: conta
        };
        observer.next( salida );
        /*if (conta === 3) {
          clearInterval( intervalo );
          observer.complete();
        }
        if (conta === 2) {
          observer.error('Auxilio!');
        }*/
      }, 500);


    }).retry(2).map( (resp: any) => {
      return resp.valor;
    }).filter( (valor) => {
        if (valor % 2 === 1) {
          return true;
        }
        return false;
    });
  }

}
