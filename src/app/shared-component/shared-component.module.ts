import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedMaterialModule} from '../helpers/shared-material/shared-material.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedComponentModule { }
