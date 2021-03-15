import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from '../../services/cookie-servise/cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public translate: TranslateService, private cookie: CookieService) {
  }

  public langToggle(toggleLang: string): void {
    this.translate.use(toggleLang);
    this.cookie.setData('lang', toggleLang);
  }
}
