import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

/**
 * *ngFor="let el of Array | filterBySearchText:
 *  { prop1: value, prop2: value, ...props } : true
 */
@Pipe({
  name: 'filterBySearchText'
})
export class FilterBySearchTextPipe implements PipeTransform {
  transform<T>(
    list: T[], searchObject: object, caseSensitive: boolean = true
  ): T[] {
    if (!list) {
      return list;
    }

    if (!searchObject || this.checkObjectIsEmpty(searchObject)) {
      return list;
    }

    return _.filter(list, (item: T) => {
      for (const key in searchObject) {
        if (searchObject.hasOwnProperty(key) && item.hasOwnProperty(key)) {
          if (caseSensitive) {
            if (_.includes(item[key], searchObject[key])) {
              return true;
            }
          } else {
            if (_.includes(
              item[key].toLowerCase(), searchObject[key].toLowerCase()
            )) {
              return true;
            }
          }
        }
      }
    });
  }

  checkObjectIsEmpty(obj: object): boolean {
    return obj && obj.constructor === Object && Object.keys(obj).length === 0;
  }
}
