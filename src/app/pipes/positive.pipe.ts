import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positive',
})
export class PositivePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return (value as number) >= 0;
  }
}
