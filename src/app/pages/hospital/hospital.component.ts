import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-uploads/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {
  totalRegistros: number = 0;
  hospitales: Hospital[] = [];
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospital();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarHospital());
  }

  buscarhospital( termino: string ) {
    if (!termino) {
      this.cargarHospital();
      return;
    }
    this._hospitalService.buscarHospital(termino)
    .subscribe( (resp: any) => {
      this.hospitales = resp;

    });

  }
  cargarHospital() {

    this._hospitalService.cargarHospitales()
    .subscribe( (resp: any) => {

      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;
      this.cargando = false;

    });
  }
  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Digite el nombre del hospital',
      icon: 'info',
      content: 'input',
      buttons: ['Cancelar', 'Insertar'],
    })
    .then(name => {

      if ( !name ) {
        return;
      }
      this._hospitalService.crearHospital(name)
      .subscribe( (resp: any) => {
          this.cargarHospital();
          swal('Hospital Creado', name, 'success');

      },
      (err: any) => {
        swal('Error al crear Hospital', err.error.mensaje, 'error');

      });
    });

  }
  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);

  }
  guardarhospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
    .subscribe( () => {
      swal('Hospital Actualizado exitosamente', hospital.nombre, 'success');
    },
   err => {
    swal('Error al actualizar hospital ' + hospital.nombre, err.error.mensaje , 'error');

   });
  }

  borrarhospital(hospital: Hospital) {
    swal({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar al hospital con el nombre ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(borrar => {
      if (borrar) {
        this._hospitalService.borrarHospital (hospital._id )
        .subscribe( (borrado: boolean) => {
          this.cargarHospital();
        });

      }

    });
  }

}
