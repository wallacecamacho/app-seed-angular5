import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StaticModule } from './app-modules/static/static.module';
import { PsGuideModule } from 'porto-seguro-guide';
import { l10nConfiginit } from './core/language/language';
import { MaterialModule, ConfigModule } from 'porto-sofea-lib';
import { TestBed, async, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../app/core';

import { AppComponent } from './app.component';
import { LocaleValidationModule, LocalizationModule } from 'angular-l10n';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { AppRoutingModule } from './app-routing.module';
import { ClienteModule } from './app-modules/cliente/cliente.module';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
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
        declarations: [AppComponent]
      }).compileComponents();
    })
  );

  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
