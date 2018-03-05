import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Hospital } from '../../models/hospital.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class HospitalService {
  token: string;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {
     this.cargarStorage();
   }

   cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }
  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + '/hospital' + '?token=' + this.token;
    return this.http.post( url, {nombre} ).map( (resp: any) => {

      return true;

    })
    .catch((err: Response) => {
      return Observable.throw(err);
   });
  }
  cargarHospitales() {

    const url = URL_SERVICIOS + '/hospital';
    return this.http.get( url );

  }
  obtenerHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url );

  }

  borrarHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;
    return this.http.delete( url )
    .map( resp => {
      swal('Hospital borrado', 'El hospital ha sido eliminado', 'success');
      return true;
    });

  }
  buscarHospital( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
    .map( (resp: any) => resp.hospitales);


  }
  actualizarHospital( hospital: Hospital) {

    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;
    return this.http.put( url, hospital )
    .map( (resp: any) => {

      swal('Hospital Actualizado', hospital.nombre, 'success');
      return true;
    });

  }


}
