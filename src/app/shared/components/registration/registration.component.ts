import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FIELD, FormComponent} from '../form/form.component';
import {Subscription} from 'rxjs';
import {Validators} from '@angular/forms';
import {MASK_TAX_NUMBER} from '../../constants/constants';
import {UserPassportDataComponent} from '../user-passport-data/user-passport-data.component';
import {CyrillicValidator} from '../../validators/validator-cyrillic';
import {TaxNumberValidator} from '../../validators/validators-inn';
import {showAnimate} from '../../animations/fading-away.animate';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EmailBlockComponent} from '../email-block/email-block.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [showAnimate]
})
export class RegistrationComponent extends FormComponent implements OnInit, OnDestroy {
  public disabledBtn = false;
  public btnSubmit = false;
  public maskTaxNumber = MASK_TAX_NUMBER;
  private subscriptions: Subscription = new Subscription();
  @ViewChild('passportData', {static: false}) passportComponent: UserPassportDataComponent;
  @ViewChild('email', {static: false}) email: EmailBlockComponent;
  public fields: FIELD[] = [
    {
      name: 'first_name', validation: [Validators.required, CyrillicValidator, Validators.maxLength(100)],
      errors: {
        required: 'Registration.ErrorMassage.Required',
        cyrillicValidator: 'Registration.ErrorMassage.CyrillicValidator',
      },
    }, {
      name: 'last_name', validation: [Validators.required, CyrillicValidator, Validators.maxLength(100)],
      errors: {
        required: 'Registration.ErrorMassage.Required',
        cyrillicValidator: 'Registration.ErrorMassage.CyrillicValidator',
      },
    }, {
      name: 'middle_name', validation: [Validators.required, CyrillicValidator, Validators.maxLength(100)],
      errors: {
        required: 'Registration.ErrorMassage.Required',
        cyrillicValidator: 'Registration.ErrorMassage.CyrillicValidator',
      },
    }, {
      name: 'tax_number', validation: [Validators.required, TaxNumberValidator],
      errors: {
        required: 'Registration.ErrorMassage.Required',
        taxNumberValidator: 'Registration.ErrorMassage.TaxNumberValidator',
      },
    },

  ];

  constructor(public snackBar: MatSnackBar, private translate: TranslateService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public nextInput(): void {
    if (this.form.controls.tax_number.valid) {
      this.passportComponent.nextInput('passport-series');
    }
  }

  public submitRegistrationForm(): void {
    this.disabledBtn = true;
    this.btnSubmit = true;
    super.submit();
    this.passportComponent.submit();
    if (this.passportComponent.statusForm() && this.form.valid && this.email.form.valid) {
      const errorForm = [];
      for (let i = 0; i < this.fields.length; i++) {
        if (this.form.controls[this.fields[i].name].value.toString().length <= 1) {
          errorForm.push(this.form.controls[this.fields[i].name].value.toString());
        }
      }
      if (errorForm.length >= 1) {
        this.snackBar.open(this.translate.instant('SnackBarMessage.ErrorSend'), '', {
          duration: 3000,
          panelClass: 'error-snack-bar',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      } else {
        this.snackBar.open(this.translate.instant('SnackBarMessage.SuccessfullySend'), '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
      this.disabledBtn = false;
      this.btnSubmit = false;
    } else {
      this.disabledBtn = false;
      this.btnSubmit = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
