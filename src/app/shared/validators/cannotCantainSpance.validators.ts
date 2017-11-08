import { ValidationErrors, AbstractControl } from '@angular/forms';

// use 'CannotContainSpace.cannotContainSpace'
// ngIf obj.errors.cannotContainSpace
export class CannotContainSpace {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return {
        cannotContainSpace: true
      };
    }
    return null;
  }
}

