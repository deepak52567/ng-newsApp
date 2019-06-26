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
  MatCheckboxModule, MatListModule,
  MatSnackBarModule, MatProgressBarModule, MatProgressSpinnerModule
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
    MatListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
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
    MatListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class SharedMaterialModule {
}
