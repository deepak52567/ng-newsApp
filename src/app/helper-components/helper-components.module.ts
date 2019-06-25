import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsCardComponent} from './news-card/news-card.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {NewsFilterComponent} from './news-filter/news-filter.component';
import {WelcomeModalComponent} from './welcome-modal/welcome-modal.component';
import {GridTitleComponent} from './grid-title/grid-title.component';
import {SharedMaterialModule} from '../helpers/shared-material/shared-material.module';
import {NewsCarousalComponent} from './news-carousal/news-carousal.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    NewsCardComponent,
    SearchBarComponent,
    NewsFilterComponent,
    WelcomeModalComponent,
    GridTitleComponent,
    NewsCarousalComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NewsCardComponent,
    SearchBarComponent,
    NewsFilterComponent,
    GridTitleComponent,
    NewsCarousalComponent
  ],
  entryComponents: [
    WelcomeModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class HelperComponentsModule {
}
