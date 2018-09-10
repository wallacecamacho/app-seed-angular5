import { PsGuideModule } from 'porto-seguro-guide';
import { ListarClienteComponent } from './../components/listar-cliente.component';
import { l10nConfiginit } from './../../../../core/language/language';
import { LocalizationModule, LocaleValidationModule } from 'angular-l10n';
import { MaterialModule } from 'porto-sofea-lib';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../../../core';

describe('ListarClienteComponent', () => {
  let component: ListarClienteComponent;
  let fixture: ComponentFixture<ListarClienteComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule,
          MaterialModule,
          CoreModule,
          PsGuideModule,
          LocalizationModule.forRoot(l10nConfiginit),
          LocaleValidationModule.forRoot()
        ],
        declarations: [ListarClienteComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
