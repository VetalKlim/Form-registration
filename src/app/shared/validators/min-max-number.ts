import {AbstractControl, ValidatorFn} from '@angular/forms';

export function minMaxValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const numValue = typeof value === 'string' ? +value.split(' ').join('') : value;
    if (numValue < min || numValue > max) {
      return {minMax: {value: numValue}};
    }
    return null;
  };
}
