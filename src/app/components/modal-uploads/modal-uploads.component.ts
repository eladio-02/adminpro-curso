import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-uploads',
  templateUrl: './modal-uploads.component.html',
  styles: []
})
export class ModalUploadsComponent implements OnInit {

  imagenSubir: File;
  imgTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
  }
  cerrarModal() {
    this._modalUploadService.ocultarModal();
    this.imagenSubir = null;
    this.imgTemp = null;

  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
    .then( resp => {

      this._modalUploadService.notificacion.emit( resp );
      this._modalUploadService.ocultarModal();
      this.cerrarModal();


    })
    .catch( err => {
      console.log('Error en la carga');
    });
  }
  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;

    }
    if ( archivo.type.indexOf('image') < 0 ) {
      this.imagenSubir = null;
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }
    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imgTemp = reader.result;

  }

}
