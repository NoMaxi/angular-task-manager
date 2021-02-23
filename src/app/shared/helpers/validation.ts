import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const patterns = {
  alphabetic: /^\p{L}+$/u,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const minLengths = {
  password: 6,
};

export const dueDateValidator = (): ValidatorFn => (
  control: AbstractControl
): ValidationErrors | null => {
  if (!(control && control.value)) {
    return null;
  }

  const currentDate = new Date().getTime();
  const dueDate = new Date(control.value).getTime();
  const invalidDueDate = dueDate < currentDate;

  return invalidDueDate ? { invalidDueDate: true } : null;
};
