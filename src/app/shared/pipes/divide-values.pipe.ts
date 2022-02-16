import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'divideValues'
})
export class DivideValuesPipe implements PipeTransform {

  transform(divident: number, divisor = 1): number {
    return (divident/divisor);
  }

}
