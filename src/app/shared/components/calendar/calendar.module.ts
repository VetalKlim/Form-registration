import {forwardRef, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {CalendarComponent} from './calendar.component';
import {InputComponent} from '../input/input.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CustomDateAdapter} from './date-adapter';


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }, {
      provide: DateAdapter,
      useClass: CustomDateAdapter
    }],
  exports: [CalendarComponent]
})
export class CalendarModule {

}
