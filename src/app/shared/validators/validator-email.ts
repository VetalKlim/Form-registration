import {FormControl} from '@angular/forms';

export function ValidatorEmail(control: FormControl): { [key: string]: boolean } {
  const test = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i.test(control.value);
  if (!test) {
    return {emailValidator: true};
  }
  return null;
}
