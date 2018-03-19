import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadsComponent } from '../components/modal-uploads/modal-uploads.component';



@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        ModalUploadsComponent,
        NopagefoundComponent,
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent
    ],
    exports: [
        NopagefoundComponent,
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        ModalUploadsComponent
    ]
})
export class SharedModule {

}
