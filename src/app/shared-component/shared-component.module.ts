import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedMaterialModule} from '../helpers/shared-material/shared-material.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PreloaderComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PreloaderComponent
  ]
})
export class SharedComponentModule { }
