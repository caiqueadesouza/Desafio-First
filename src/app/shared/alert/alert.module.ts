import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from './alert.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [AlertComponent],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class AlertModule { }