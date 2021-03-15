import {Injectable, PLATFORM_ID} from '@angular/core';
import {LOCALE_ID, Inject} from '@angular/core';
import {NativeDateAdapter} from '@angular/material/core';
import {getLocaleFirstDayOfWeek} from '@angular/common';

/** Расширение для календаря, чтобы неделя начиналась с понедельника. **/

@Injectable({providedIn: 'root'})
export class CustomDateAdapter extends NativeDateAdapter {

  constructor(
    @Inject(LOCALE_ID) public locale,
    @Inject(PLATFORM_ID) platformId
  ) {
    super(locale, platformId);
  }

  public getFirstDayOfWeek(): any {
    return getLocaleFirstDayOfWeek(this.locale);
  }
}
