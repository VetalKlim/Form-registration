import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeRu from '@angular/common/locales/ru';
import localeUk from '@angular/common/locales/uk';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {RegistrationComponent} from './shared/components/registration/registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputModule} from './shared/components/input/input.module';
import {UserPassportDataModule} from './shared/components/user-passport-data/user-passport-data.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBar} from '@angular/material/snack-bar';

registerLocaleData(localeRu, 'ru');
registerLocaleData(localeUk, 'uk');

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    InputModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    UserPassportDataModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    MatSnackBar,
    {provide: LOCALE_ID, useValue: {locales: ['uk', 'ru']}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
