import { l10nConfiginit } from './../../../core/language/language';
import { LocalizationModule, LocaleValidationModule } from 'angular-l10n';
import { MaterialModule } from 'porto-sofea-lib';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../../core';

import { MenuClienteComponent } from './menu-cliente.component';

describe('MenuComponent', () => {
  let component: MenuClienteComponent;
  let fixture: ComponentFixture<MenuClienteComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule,
          MaterialModule,
          CoreModule,
          LocalizationModule.forRoot(l10nConfiginit),
          LocaleValidationModule.forRoot()
        ],
        declarations: [MenuClienteComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
