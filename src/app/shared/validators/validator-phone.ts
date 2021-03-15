import {FormControl} from '@angular/forms';

export function PhoneValidator(control: FormControl): { [key: string]: boolean } {
  let spaceRemoval;
  if (control.value) {
    spaceRemoval = control.value.replace(/ +?/g, '');
  }
  const test = /^\+38(0(50|63|66|67|68|73|91|92|93|94|95|96|97|98|99)[0-9]{3}[0-9]{2}[0-9]{2})$/.test(spaceRemoval);
  if (!!control.value && !test) {
    return {phoneValidator: true};
  }
  return null;
}

