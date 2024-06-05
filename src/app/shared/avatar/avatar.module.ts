import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AvatarComponent],
  imports: [CommonModule],
  exports: [AvatarComponent],
})
export class AvatarModule { }