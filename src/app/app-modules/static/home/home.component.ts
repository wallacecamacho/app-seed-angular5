import { Component, OnInit } from '@angular/core';

import { ANIMATE_ON_ROUTE_ENTER } from '../../../core';
import { Language, TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  @Language() lang: string;

  constructor(
    public translation: TranslationService
  ) {}

  ngOnInit(): void {
  }
}
