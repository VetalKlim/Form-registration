import {FormControl} from '@angular/forms';
import {Injector} from '@angular/core';
import {DecryptTaxNumberService} from '../services/tax-number-decryption/tax-number-decryption.service';

export function TaxNumberValidator(control: FormControl): { taxNumberValidator: boolean | null } {
  const injector = Injector.create([{provide: DecryptTaxNumberService, useClass: DecryptTaxNumberService, deps: []}]);
  const nameMethodsService = injector.get(DecryptTaxNumberService);
  if (nameMethodsService.getDecodeTaxNumber(control.value) === false) {
    return {taxNumberValidator: true};
  }
  return null;
}
