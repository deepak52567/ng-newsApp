import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatGridListModule,
  MatCardModule,
  MatDialogModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule, MatListModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule
  ]
})
export class SharedMaterialModule {
}
