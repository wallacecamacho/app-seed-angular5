import { l10nConfiginit } from './../../core/language/language';
import { NgModule } from '@angular/core';

import { StaticRoutingModule } from './static-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'porto-sofea-lib';
import { LocalizationModule, LocaleValidationModule } from 'angular-l10n';

@NgModule({
  imports: [
    MaterialModule,
    StaticRoutingModule,
    LocalizationModule.forRoot(l10nConfiginit),
    LocaleValidationModule.forRoot()],
  declarations: [HomeComponent]
})
export class StaticModule {}
