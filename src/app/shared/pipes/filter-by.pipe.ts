import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

/**
 * *ngFor="let el of Array | filterBy:{ prop1: value, prop2: value, ...props }
 */
@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  transform<T>(list: T[], filterObj: object): any[] {
    if (!list) {
      return list;
    }

    if (!filterObj || this.checkObjectIsEmpty(filterObj)) {
      return list;
    }

    return _.filter(list, filterObj);
  }

  checkObjectIsEmpty(obj: object): boolean {
    return obj && obj.constructor === Object && Object.keys(obj).length === 0;
  }
}
