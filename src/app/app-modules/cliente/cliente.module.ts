import { l10nConfiginit } from './../../core/language/language';

import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';

import { ClienteRoutingModule } from './cliente-routing.module';
import { MenuClienteComponent } from './menu-cliente/menu-cliente.component';
import { EditarClienteComponent } from './manter/components/editar-cliente.component';
import { ListarClienteComponent } from './manter/components/listar-cliente.component';
import { DialogEditarClienteComponent } from './manter/components/dialog-editar-cliente.component';
import { DialogExcluirClienteComponent } from './manter/components/dialog-excluir-cliente.component';
import { DialogMessageComponent } from './manter/components/dialog-message.component';

import { LocalizationModule, LocaleValidationModule } from 'angular-l10n';
import { handlerProviderDialog, MaterialModule } from 'porto-sofea-lib';

import { CadastroClienteService } from './manter/services/manter-cliente.service';

import {
  PsBadgeModule,
  PsBtnModule,
  PsDataviewModule,
  PsGridModule,
  PsIcoModule,
  PsListModule,
  PsLoadingModule,
  PsPanelModule,
  PsTableModule,
  PsTitleModule,
  PsTabsModule,
  PsAccordionModule,
  PsTooltipModule,
  PsWizardModule,
  PsSharerModule,
  PsNotifyModule,
  PsMenuModule,
  PsFormResourcesModule,
  PsModalModule,
  PsPopoverModule,
  PsAutocompleteModule,
  PsSliderModule,
  PsCalendarModule,
  PsCalendarAvailabilityModule,
  PsCardModule,
  //PsCarrosselModule,
  PsDatagridModule,
  PsChartModule,
  PsGuideModule,
  Logger,
  Util,
  FormValidate
 } from 'porto-seguro-guide';

@NgModule({
  imports: [
    MaterialModule,
    PsBadgeModule,
    PsBtnModule,
    PsDataviewModule,
    PsGridModule,
    PsIcoModule,
    PsListModule,
    PsLoadingModule,
    PsPanelModule,
    PsTableModule,
    PsTitleModule,
    PsTabsModule,
    PsAccordionModule,
    PsTooltipModule,
    PsWizardModule,
    PsSharerModule,
    PsNotifyModule,
    PsMenuModule,
    PsFormResourcesModule,
    PsModalModule,
    PsPopoverModule,
    PsAutocompleteModule,
    PsSliderModule,
    PsCalendarModule,
    PsCalendarAvailabilityModule,
    PsCardModule,
    //PsCarrosselModule,
    PsDatagridModule,
    PsChartModule,
    PsAccordionModule,
    PsCalendarModule,
    ClienteRoutingModule,
    NgxPaginationModule,
    LocalizationModule.forRoot(l10nConfiginit),
    LocaleValidationModule.forRoot()
  ],
  declarations: [
    EditarClienteComponent,
    ListarClienteComponent,
    MenuClienteComponent,
    DialogEditarClienteComponent,
    DialogExcluirClienteComponent,
    DialogMessageComponent,
  ],
  providers: [
    CadastroClienteService,
    handlerProviderDialog,
    Logger, Util, FormValidate
  ],
  entryComponents: [
    DialogEditarClienteComponent,
    DialogExcluirClienteComponent,
    DialogMessageComponent,
  ],
})
export class ClienteModule {
  constructor() {}
}
