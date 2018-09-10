import {
    L10nConfig,
    L10nLoader,
    LocalizationModule,
    LocaleValidationModule,
    StorageStrategy,
    ProviderType
} from 'angular-l10n';
import { environment as env } from '../../../environments/environment';

import { APP_INITIALIZER } from '@angular/core';


    export const l10nConfiginit: L10nConfig = {
        locale: {
            languages: [
                { code: 'en', dir: 'ltr' },
                { code: 'pt-BR', dir: 'ltr' },
                { code: 'pt', dir: 'ltr' }
            ],
            defaultLocale: { languageCode: 'pt', countryCode: 'R$' },
            currency: 'R$',
            storage: StorageStrategy.Local,
            cookieExpiration: 30
        },
        translation: {
            providers: [
                { type: ProviderType.Static, prefix: env.contextRoot + '/assets/locale/locale-' }
            ],
            caching: true,
            composedKeySeparator: '.',
            missingValue: 'No kye',
            i18nPlural: true
        }
    };


// Advanced initialization.
export function initL10n(l10nLoader: L10nLoader): Function {
    return () => l10nLoader.load();
}

/** Http interceptor providers in outside-in order */
export const httpLanguageProviders = [
    { provide: APP_INITIALIZER, useFactory: initL10n, deps: [L10nLoader], multi: true }
  ];
