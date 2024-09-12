import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const validName = /^[a-zA-Z0-9\s\p{Emoji}]{3,20}$/u.test(value);

    return !validName ? { invalidName: true } : null;
  }
}
