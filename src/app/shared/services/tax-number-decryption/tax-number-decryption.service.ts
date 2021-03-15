import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DecryptTaxNumberService {


  public getDecodeTaxNumber(num: string): boolean | object {
    if (num.length !== 10) {
      return false;
    }
    const split = num.split('');
    // @ts-ignore
    const sum = split[0] * (-1) + split[1] * 5 + split[2] * 7 + split[3] * 9 + split[4] * 4 + split[5] * 6 + split[6] * 10 + split[7] * 5 + split[8] * 7;
    // tslint:disable-next-line:radix
    let control = parseInt(String(sum - (11 * parseInt(String(sum / 11)))));
    if (control === 10) {
      control = 0;
    }
    // tslint:disable-next-line:radix
    if (control !== parseInt(split[9])) {
      return false;
    }
    // @ts-ignore
    const gender = (split[8] % 2) ? 1 : 2;
    const addDays = num.substr(0, 5);
    const date = moment('1900-01-01').add(addDays, 'days').subtract(1, 'days');
    return {num, gender, date};
  }
}
