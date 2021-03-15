import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() {
  }


  public setData(key: string, value: string): void {
    this.setDataOnClient(key, value);
  }

  public getData(key: string): string {
    return this.getDataOnClient(key);
  }

  private setDataOnClient(key: string, value: string): void {
    document.cookie = `${key}=${value || ''}; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax; path=/`;
  }

  private getDataOnClient(key: string): string {
    const name = key + '=';
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i];

      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }
}
