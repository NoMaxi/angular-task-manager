import { Pipe, PipeTransform } from '@angular/core';

import { orderBy } from 'lodash';

/**
 * *ngFor="let el of oneDimArray | sortBy:'asc'"
 * *ngFor="let el of arrayOfObjects | sortBy:'asc':'propName'"
 */
@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform<T>(
    list: T[],
    order: boolean | 'asc' | 'desc' = 'asc',
    propName: string = ''
  ): T[] {
    if (!list || !order) {
      return list;
    }

    if (list.length <= 1) {
      return list;
    }

    if (!propName || propName === '') {
      if (order === 'asc') {
        return list.sort();
      } else {
        return list.sort().reverse();
      }
    }

    return orderBy(list, [propName], [order]);
  }
}
