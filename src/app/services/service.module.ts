import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService,
         SidebarService,
         SharedService,
         HospitalService,
         UsuarioService,
         LoginGuardGuard,
         SubirArchivoService,
         MedicoService, AdminGuard, VerificaTokenGuard } from './service.index';
import { ModalUploadService } from '../components/modal-uploads/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
