import {Injectable} from '@angular/core';
import {CookieService} from '../cookie-servise/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageBrowserService {

  constructor(private cookie: CookieService) {
  }


  public getBrowserLanguage(): string {
    let lang = this.cookie.getData('lang');
    if (!!lang) {
      return lang;
    } else {
      lang = this.languageBrowser();
    }
    return lang;
  }

  private languageBrowser(): string {
    // @ts-ignore
    const clientLanguage = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    return clientLanguage.substr(0, 2).toLowerCase();
  }
}
