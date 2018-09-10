import { l10nConfiginit } from './../../../core/language/language';
import { LocaleValidationModule, LocalizationModule } from 'angular-l10n';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MaterialModule } from 'porto-sofea-lib';
import { CoreModule } from '../../../core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          CoreModule,
          LocalizationModule.forRoot(l10nConfiginit),
          LocaleValidationModule.forRoot()
        ],
        declarations: [HomeComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
