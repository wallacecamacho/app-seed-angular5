import { l10nConfiginit } from './core/language/language';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { LocalizationModule, LocaleValidationModule } from 'angular-l10n';

import { CoreModule } from './core';

import { StaticModule } from './app-modules/static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpLanguageProviders } from './core/language/language';

import { ConfigModule, MessagesHandlerComponent, MaterialModule } from 'porto-sofea-lib';
// import { PsGuideModule } from './porto-guide-angular/ps-guide.module';
// import { PsGuideModule } from '@porto-seguro-guide';
import { PsGuideModule } from 'porto-seguro-guide';
import { ClienteModule } from './app-modules/cliente/cliente.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MessageLoggerService } from './core/logger/message-logger.service';
import { BrowserXhr } from '@angular/http';
import { LoggingInterceptor, httpLogggerInterceptorProviders } from './core/logger/logging.interceptor';


@NgModule({
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    // core & shared
    CoreModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NgProgressModule.forRoot({
      spinnerPosition: 'right',
      color: 'white',
      thick: true,
      meteor: true,
      spinner: true
    }),
    NgProgressHttpModule,
    // features
    StaticModule,
    //
     ClienteModule,
    // app
    AppRoutingModule,
    // LIB SOFEA
    ConfigModule,
    PsGuideModule,
    // Lang
    LocalizationModule.forRoot(l10nConfiginit),
    LocaleValidationModule.forRoot()
  ],
  entryComponents: [
    MessagesHandlerComponent
  ],
  declarations: [AppComponent],
  providers: [
    MessageLoggerService,
    LoggingInterceptor,
    httpLogggerInterceptorProviders,
    // Lang
    httpLanguageProviders
   ],
  bootstrap: [AppComponent]
})
export class AppModule {}
