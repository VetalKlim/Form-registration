import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {UserPassportDataComponent} from './user-passport-data.component';
import {InputModule} from '../input/input.module';
import {CalendarModule} from '../calendar/calendar.module';
import {EmailBlockComponent} from '../email-block/email-block.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CalendarModule,
        CommonModule,
        InputModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  providers: [],
    declarations: [UserPassportDataComponent, EmailBlockComponent],
    exports: [UserPassportDataComponent, EmailBlockComponent],
})
export class UserPassportDataModule {
}
