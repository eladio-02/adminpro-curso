import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];

  constructor(
    public _medicoServices: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }
  cargarMedicos() {
    this._medicoServices.cargarMedicos()
    .subscribe( (medicos: any) => this.medicos = medicos);
  }
  buscarMedico( termino: string) {
    if (!termino) {
      this.cargarMedicos();
      return;
    }
    this._medicoServices.buscarMedicos( termino )
    .subscribe( medicos => this.medicos = medicos );
  }
  borrarMedico(medico) {
    this._medicoServices.borrarMedico(medico._id).subscribe(
      () => this.cargarMedicos()
    );
  }

}
