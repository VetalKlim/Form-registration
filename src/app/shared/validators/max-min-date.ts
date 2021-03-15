import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

function dateCheck(startDate, nowDate, endDate): boolean {
  const start = Date.parse(moment(startDate).format('YYYY/MM/DD'));
  const now = Date.parse(moment(nowDate).format('YYYY/MM/DD'));
  const end = Date.parse(moment(endDate).format('YYYY/MM/DD'));
  return (start <= now && now <= end);
}

export function minMaxDateValidator(start: Date | string, end: Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!dateCheck(start, control.value, end)) {
      return {dateValidation: true};
    }
    return null;
  };
}
