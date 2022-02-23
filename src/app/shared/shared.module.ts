import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivideValuesPipe } from './pipes/divide-values.pipe';
import { CardExistsValidator } from './validators/card-exists.validator';



@NgModule({
  declarations: [
    DivideValuesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DivideValuesPipe
  ],
  providers: [
    CardExistsValidator,
  ]
})
export class SharedModule { }
