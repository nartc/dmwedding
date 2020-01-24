import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeferImageDirective } from './defer-image.directive';

@NgModule({
  declarations: [DeferImageDirective],
  imports: [CommonModule],
  exports: [DeferImageDirective],
})
export class DeferImageModule {}
