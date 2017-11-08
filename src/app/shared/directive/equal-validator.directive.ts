import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appValidateEqual][formControlName],[appValidateEqual][formControl],[appValidateEqual][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective),
      multi: true
    }
  ]
})
export class EqualValidatorDirective {
  constructor(
    @Attribute('appValidateEqual') public appValidateEqual: string,
    @Attribute('reverse') public reverse: string
  ) { }

  private get isReverse() {
    if (!this.reverse) {
      return false;
    }

    return this.reverse === 'true';
  }

  validate(c: AbstractControl): { [key: string]: any } {
    // self value
    const v = c.value;

    // control vlaue
    const e = c.root.get(this.appValidateEqual);

    // value not equal
    // The value of reverse is not set or the value is false
    if (e && v !== e.value && !this.isReverse) {
      return {
        appValidateEqual: false
      };
    }

    // value equal and reverse
    // If the value is equal and the value of reverse is true, the validateEqual exception message is deleted
    if (e && v === e.value && this.isReverse) {
      delete e.errors['appValidateEqual'];
      if (!Object.keys(e.errors).length) {
        e.setErrors(null);
      }
    }

    // value not equal and reverse
    // If the values are not equal and the value of reverse is true, the exception information is added to the matching target control
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({ appValidateEqual: false });
    }
    return null;
  }

}

//  <input type="text" formControlName="password" appValidateEqual="confirmPassword" reverse="true">
//  <input type="text" formControlName="confirmPassword" appValidateEqual="password">
