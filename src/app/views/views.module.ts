import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule} from '../helpers/shared-material/shared-material.module';
import {HomeComponent} from './home/home.component';
import {ListComponent} from './list/list.component';
import {HelperComponentsModule} from '../helper-components/helper-components.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiKey} from '../helpers/interceptor/api-key';
import {AuthService} from '../services/auth/auth.service';
import {TopNewsService} from '../services/top-news/top-news.service';
import {SourcesService} from '../services/sources/sources.service';

@NgModule({
  declarations: [HomeComponent, ListComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    HelperComponentsModule,
    HttpClientModule
  ],
  exports: [
    HomeComponent,
    ListComponent
  ],
  providers: [
    AuthService,
    TopNewsService,
    SourcesService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiKey, multi: true }
  ]
})
export class ViewsModule { }
