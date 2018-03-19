import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Token Guard');
    const token = this._usuarioService.token;
    const payload = JSON.parse( atob(token.split('.')[1]) );

    if (this.expirado(payload.exp)) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();
      ahora.setTime( ahora.getTime() + (4 * 60 * 60 * 1000) );

      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken()
        .subscribe( () => {
          resolve(true);
        },
      () => {
        this.router.navigate(['/login']);
        reject(false);
      });
      }
    });

  }
  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {

      return true;

    }
    return false;
  }



}
