import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    let timeBefore;
    const date = new Date(value);
    timeBefore =
        ('0' + date.getUTCFullYear()).slice(-2) + '年'
        + ('0' + (date.getUTCMonth() + 1)).slice(-2) + '月'
        + ('0' + date.getUTCDate()).slice(-2) + '日';
    return timeBefore;
  }
}
