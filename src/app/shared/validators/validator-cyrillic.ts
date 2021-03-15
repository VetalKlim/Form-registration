import {FormControl} from '@angular/forms';

export function CyrillicValidator(control: FormControl): { [key: string]: boolean } {
  const test = /^[А-Яа-яёЁЇїІіЄєҐґ.,’`‘ '-]+$/.test(control.value);
  if (!test) {
    return {cyrillicValidator: true};
  }
  return null;
}
