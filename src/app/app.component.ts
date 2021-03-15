import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from './shared/services/cookie-servise/cookie.service';
import {LanguageBrowserService} from './shared/services/language-browser-service/language-browser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService, private cookie: CookieService, private langBrowser: LanguageBrowserService) {
    translate.addLangs(['ru', 'uk']);
    translate.setDefaultLang('ru');
    let lang = this.cookie.getData('lang');
    if (!lang || !lang.match(/ru|uk/)) {
      lang = this.langBrowser.getBrowserLanguage();
      this.cookie.setData('lang', this.langBrowser.getBrowserLanguage());
    }
    translate.use((lang.match(/ru|uk/) || ['ru'])[0]);
  }

}
