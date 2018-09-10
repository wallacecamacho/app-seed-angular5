import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';
import { ISubscription } from 'rxjs/Subscription';
import { LocaleService, TranslationService, Language } from 'angular-l10n';

import {
  routerTransition
} from '../app/core';

import { environment as env } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit, OnDestroy {
  //private unsubscribe$: Subject<void> = new Subject<void>();

  @HostBinding('class') componentCssClass;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  angular = env.versions.angular;
  year = new Date().getFullYear();
  logo = require('../assets/inst-bgd-sm.png');
  logoFooter = require('../assets/porto-itauResid-azul-bgl.png');

  subscription: ISubscription;
  @Language() lang: string;

  navigation = [
    { link: 'home', label: 'Home' },
    { link: 'cliente', label: 'Cliente' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Settings' }
  ];

  countryMenuItems: any[] = [
    {
      text: 'Brasil',
      language: 'pt-BR',
      country: 'BR',
      currency: 'R$',
      numberingSystem: 'latn'
    },
    {
      text: 'United States',
      language: 'en',
      country: 'US',
      currency: 'USD',
      numberingSystem: 'latn'
    }
  ];

  constructor(
    public overlayContainer: OverlayContainer,
    private router: Router,
    private titleService: Title,
    public locale: LocaleService,
    public translation: TranslationService
  ) {}


  ngOnInit(): void {
    this.subscription = this.translation.translationChanged().subscribe(() => {
      this.titleService.setTitle(this.translation.translate('App.Tittle'));
    });

    this.router.events
      .pipe(
       // takeUntil(this.unsubscribe$),
        filter(event => event instanceof ActivationEnd)
      )
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
      });

  }

  ngOnDestroy(): void {
    //this.unsubscribe$.next();
   // this.unsubscribe$.complete();
    //this.subscription.unsubscribe();
  }

  get currentCountry(): string {
    return this.locale.getCurrentCountry();
  }

  get currentNumberingSystem(): string {
    return this.locale.getCurrentNumberingSystem();
  }

  selectLocale(
    language: string,
    country: string,
    currency: string,
    numberingSystem: string
  ): void {
    this.locale.setDefaultLocale(language, country, '', numberingSystem);
    this.locale.setCurrentCurrency(currency);
  }
}
