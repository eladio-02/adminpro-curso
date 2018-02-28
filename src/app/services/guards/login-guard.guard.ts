import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor( public _usuarioService: UsuarioService, public router: Router) {}

  canActivate() {
    if (this._usuarioService.estaLogeuado()) {
      console.log('entró al guard');
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
