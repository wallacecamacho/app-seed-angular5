import { Language } from 'angular-l10n';
import { Component, OnInit } from '@angular/core';

import { routerTransition } from '../../../core';

@Component({
  selector: 'app-examples',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.scss'],
  animations: [routerTransition]
})
export class MenuClienteComponent implements OnInit {

  @Language() lang: string;
  menus = [
    { link: 'manter', label: 'Menu.Cadastrar' },
    { link: 'listar', label: 'Menu.Listar' }
  ];

  constructor() {}

  ngOnInit() {}
}
