import {FormControl} from '@angular/forms';

export function ValidatorStreet(control: FormControl): { [key: string]: boolean } {
  const test = /^[\u0400-\u04FF \-’`‘ '.,0-9]+$/.test(control.value);
  if (!test) {
    return test ? null : {validatorStreet: true};
  }
  return null;
}
