import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'divideValues'
})
export class DivideValuesPipe implements PipeTransform {

  transform(divident: number | undefined, divisor = 1): number {
    if (divident == undefined) {
      return 0;
    }

    if (divisor == 0) {
      return 0;
    }

    return (divident/divisor);
  }

}
