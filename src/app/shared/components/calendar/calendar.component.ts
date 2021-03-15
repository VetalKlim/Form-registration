import {
  AfterViewChecked, ChangeDetectorRef,
  Component, ElementRef, EventEmitter,
  HostListener,
  Input,
  OnInit, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DateAdapter} from '@angular/material/core';
import {MatCalendar} from '@angular/material/datepicker';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [trigger('transformPanel', [
    state('void', style({
      transform: 'scaleY(0)',
      minWidth: '100%',
      opacity: 0,

    })),
    state('showing', style({
      opacity: 1,
      minWidth: 'calc(100% + 32px)',
      transform: 'scaleY(1)',

    })),
    state('showing-multiple', style({
      opacity: 1,
      minWidth: 'calc(100% + 64px)',
      transform: 'scaleY(1)',

    })),
    transition('void => *', animate('120ms cubic-bezier(0.1, 0, 0.2, 0.1)')),
    transition('* => void', animate('1ms 2ms linear', style({opacity: 0})))
  ])]

})
export class CalendarComponent implements OnInit, AfterViewChecked {
  @Input() startDate?: Date;
  @Input() endDate?: Date;
  @Input() pattern?: string;
  @Input() formControlCalendar?: AbstractControl;
  @Input() disableCalendar?: boolean;
  @Input() labelCalendar: string;
  @Input() errorMessage: string;
  @Input() nameInput: string;
  public visibleError: boolean;
  public iconActive: boolean;
  private local: string;
  public labelActive: boolean;
  public dataUser: Date;
  @ViewChild('calendarInput', {static: false}) calendarInput: ElementRef;
  @ViewChild(MatCalendar) datePicker: MatCalendar<Date>;
  @Output() coll = new EventEmitter<boolean>();

  constructor(private cdRef: ChangeDetectorRef,
              private translate: TranslateService,
              private adapter: DateAdapter<any>) {
    this.iconActive = false;
  }

  ngOnInit(): void {
    this.getLocaleCalendar();
    if (!this.formControlCalendar) {
      this.formControlCalendar = new FormControl(
        {value: this.dataUser, disabled: this.disableCalendar},
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      );
    }
    if (this.disableCalendar) {
      this.formControlCalendar.disable();
    }
    this.formControlCalendar.valueChanges.subscribe((value: Date) => {
      if (value !== this.dataUser) {
        this.dataUser = value;
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.formControlCalendar) {
      this.labelActive = this.formControlCalendar.value === '';
      this.cdRef.detectChanges();
    }
  }

  @HostListener('keypress', ['$event']) onKeydownHandler(e): void {
    if (e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }
    const lengthString = e.target.value.length;
    if (lengthString !== 1 || lengthString !== 3) {
      if (e.keyCode === 47) {
        e.preventDefault();
      }
    }
    if (lengthString === 2) {
      e.target.value += '.';
    }
    if (lengthString === 5) {
      e.target.value += '.';
    }
  }

  private getLocaleCalendar(): void {
    this.local = this.translate.currentLang;
    console.log(this.local);
    this.adapter.setLocale(this.local);
  }


  errorChecking(): boolean {
    if (this.formControlCalendar) {
      return this.formControlCalendar.invalid && (this.formControlCalendar.dirty);
    }
  }

  transferDate(e: any): void {
    this.visibleError = false;
    if (e.target.value.length === 10) {
      const year = e.target.value.split('.').reverse().join('').slice(0, 4);
      const mount = e.target.value.split('.').reverse().join('').slice(4, 6);
      const day = e.target.value.split('.').reverse().join('').slice(6, 8);
      const dataForm = new Date();
      dataForm.setFullYear(year);
      dataForm.setMonth(mount - 1);
      dataForm.setDate(day);
      this.dataUser = dataForm;
      if (this.formControlCalendar) {
        setTimeout(() => {
          this.formControlCalendar.setValue(dataForm);
        });
      }
    }
  }

  errorVisible(): void {
    this.visibleError = this.errorChecking();
  }

  transferParent(value?: Date): void {
    if (value !== null) {
      this.dataUser = value;
      if (this.formControlCalendar) {
        this.formControlCalendar.setValue(this.dataUser);
      }
    } else {
      this.formControlCalendar.setValue('');
    }
    this.calendarInput.nativeElement.dispatchEvent(new Event('focus', {bubbles: true}));
  }

  focusCalendar(e?, click?: boolean): void {
    this.calendarInput.nativeElement.dispatchEvent(new Event('blur', {bubbles: true}));
    this.iconActive = !this.disableCalendar;
    if (click) {
      this.clickCalendar(e);
    }
  }

  clickCalendar(e?: Event): void {
    if (e) {
      this.coll.emit(true);
    } else {
      this.coll.emit(false);
    }
  }
}
