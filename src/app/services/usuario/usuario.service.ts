import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
   }
  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }
  estaLogeuado() {
    return (this.token.length > 5) ? true : false;
  }
  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token}).map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    });
  }
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false) {
    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
    .map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      /* localStorage.setItem('id', resp.id);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('id', JSON.stringify(resp.usuario)); */
      return true;
    });
  }
  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
    .map( (resp: any) => {
      swal('Usuario Creado', usuario.email, 'success');
      return resp.usuario;
    });

  }
  actualizarUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.put( url, usuario )
    .map( (resp: any) => {
      this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
      swal('Usuario Actualizado', usuario.nombre, 'success');
      return true;
    });
  }

  cambiarImagen( archivo: File, id: string) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
    .then( (resp: any) => {

        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
        console.log(resp);
    })
    .catch(resp => {

      console.log(resp);

    });

  }

}