import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
/// GUARDS
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        canActivate: [ VerificaTokenGuard ],
        component: DashboardComponent,
        data: { titulo: 'Dashboard' }
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
    { path: 'graficas1', component: Graficas1Component, pathMatch: 'full', data: { titulo: 'Graficas' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
    /// Mantenimientos
    { path: 'usuarios', canActivate: [ AdminGuard ] , component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuario' } },
    { path: 'hospitales', component: HospitalComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
