import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {InputComponent} from '../input/input.component';
import {Subscription} from 'rxjs';
import {
  MASK_IDENTITY_ISSUER_ID_CARD,
  MASK_NUMBER_PASSPORT,
  MASK_NUMBER_PASSPORT_ID_CARD,
  MASK_SERIES_PASSPORT
} from '../../constants/constants';
import {FIELD, FormComponent} from '../form/form.component';
import {Validators} from '@angular/forms';
import {minMaxDateValidator} from '../../validators/max-min-date';
import {CyrillicValidator} from '../../validators/validator-cyrillic';
import {showAnimate} from '../../animations/fading-away.animate';
import {CalendarComponent} from '../calendar/calendar.component';

@Component({
  selector: 'app-user-passport-data',
  templateUrl: './user-passport-data.component.html',
  styleUrls: ['./user-passport-data.component.scss'],
  animations: [showAnimate]
})
export class UserPassportDataComponent extends FormComponent implements AfterViewChecked, OnInit, OnDestroy {
  public maskSeriesPassport = MASK_SERIES_PASSPORT;
  public maskNumberPassport = MASK_NUMBER_PASSPORT;
  public maskNumberPassportIDCard = MASK_NUMBER_PASSPORT_ID_CARD;
  public maskIdentityIssuerIDCard = MASK_IDENTITY_ISSUER_ID_CARD;
  public idCard = false;
  public passportStartDate = new Date();
  public passportEndDate = new Date(new Date().setDate(new Date().getDate() - 1));
  @Input() currentCreditStatus: boolean;
  private subscriptions: Subscription = new Subscription();
  public currentCredit: boolean;
  dd: boolean;
  @Output() typePassport = new EventEmitter();
  @ViewChild('passportSeries', {static: false}) passportSeries: InputComponent;
  @ViewChild('passportNumber', {static: false}) passportNumber: InputComponent;
  @ViewChild('identityNumber', {static: false}) identityNumber: InputComponent;
  @ViewChild('identityIssuer', {static: false}) identityIssuer: InputComponent;
  @ViewChild('cal', {static: false}) calendar: CalendarComponent;

  public fields: FIELD[] = [
    {
      name: 'passport_series',
      validation: [Validators.required, Validators.minLength(2)],
      errors: {
        required: 'Registration.ErrorMassage.PassportError',
        minlength: 'Registration.ErrorMassage.PassportError'
      },
    }, {
      name: 'passport_number', validation: [Validators.required, Validators.minLength(6)],
      errors: {
        required: 'Registration.ErrorMassage.NumberPassportError',
        minlength: 'Registration.ErrorMassage.NumberPassportError',
      },
    }, {
      name: 'identity_number', validation: [Validators.required, Validators.minLength(9)],
      errors: {
        required: 'Registration.ErrorMassage.PassportIDError',
        minlength: 'Registration.ErrorMassage.PassportIDError',
      },
    }, {
      name: 'identity_issuer',
      validation: [Validators.required, CyrillicValidator, Validators.maxLength(100)],
      errors: {
        required: 'Registration.ErrorMassage.IdentityIssuerError',
        cyrillicValidator: 'Registration.ErrorMassage.CyrillicValidator',
        maxlength: 'Registration.ErrorMassage.IdentityIssuerError',
      },
    }, {
      name: 'identity_issuer_id_card', validation: [Validators.required, Validators.minLength(4)],
      errors: {
        required: 'Registration.ErrorMassage.IdentityIssuerIdCardError',
        minlength: 'Registration.ErrorMassage.IdentityIssuerIdCardError',
      },
    }, {
      name: 'identity_issued_date',
      validation: [Validators.required, minMaxDateValidator(this.passportStartDate, this.passportEndDate)],
      errors: {
        required: 'Registration.ErrorMassage.IdentityIssuedDateError',
        dateValidation: 'Registration.ErrorMassage.IdentityIssuedDateError',
      },
    }, {
      name: 'identity_issued_id_date',
      validation: [Validators.required, minMaxDateValidator(this.passportStartDate, this.passportEndDate)],
      errors: {
        required: 'Registration.ErrorMassage.IdentityIssuedIdDateError',
        dateValidation: 'Registration.ErrorMassage.IdentityIssuedIdDateError',
      },
    }
  ];

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.onIdentityTypeChange();
  }

  ngAfterViewChecked(): void {
    this.onIdentityTypeChange();
    this.cdRef.detectChanges();
  }

  public statusForm(): boolean {
    this.checkFormsUser();
    return this.form.valid;
  }

  private checkFormsUser(): void {
    if (!this.idCard) {
      this.form.controls.identity_number.disable();
      this.form.controls.identity_issuer_id_card.disable();
      this.form.controls.identity_issued_id_date.disable();
    } else {
      this.form.controls.passport_number.disable();
      this.form.controls.passport_series.disable();
      this.form.controls.identity_issuer.disable();
      this.form.controls.identity_issued_date.disable();
    }
  }

  public nextInput(id): void {
    if (id === 'passport-series') {
      if (!this.idCard) {
        this.passportSeries.focus();
      } else {
        this.identityNumber.focus();
      }
    }
    if (id === 'passport_number') {
      if (!this.idCard) {
        if (this.form.controls.passport_series.valid) {
          this.passportNumber.focus();
        }
      } else {
        if (this.form.controls.identity_number.valid) {
          this.identityIssuer.focus();
        }
      }
    }
  }

  private onIdentityTypeChange(): void {
    if (!this.idCard) {
      this.passportStartDate.setFullYear(1991, 7, 25);
      this.form.controls.identity_issued_date.setValidators(minMaxDateValidator(this.passportStartDate, this.passportEndDate));
    } else {
      this.passportStartDate.setFullYear(2016, 1, 10);
      this.form.controls.identity_issued_id_date.setValidators(minMaxDateValidator(this.passportStartDate, this.passportEndDate));
    }
  }

  public toggleIdentityType(): void {
    if (!this.currentCredit) {
      this.idCard = !this.idCard;
      if (this.idCard) {
        this.typePassport.emit('identity');
      } else {
        this.typePassport.emit('passport');
      }
      this.form.enable();
      this.form.updateValueAndValidity();
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // public errorSimulation(event?: KeyboardEvent): void {
  //   const date = new Date();
  //   date.setFullYear(date.getFullYear() + 10000);
  //   this.passportStartDate.setFullYear(900, 1, 1);
  //   this.passportEndDate = date;
  //   this.form.controls.identity_issued_id_date.setValidators(minMaxDateValidator(this.passportStartDate, this.passportEndDate));
  // }

}
