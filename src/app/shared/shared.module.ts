import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivideValuesPipe } from './pipes/divide-values.pipe';



@NgModule({
  declarations: [
    DivideValuesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DivideValuesPipe
  ]
})
export class SharedModule { }
