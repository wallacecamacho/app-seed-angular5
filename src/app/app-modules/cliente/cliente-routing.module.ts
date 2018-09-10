import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuClienteComponent } from './menu-cliente/menu-cliente.component';
import { EditarClienteComponent } from './manter/components/editar-cliente.component';
import { ListarClienteComponent } from './manter/components/listar-cliente.component';


const routes: Routes = [
  {
    path: 'cliente',
    component: MenuClienteComponent,
    children: [
      {
        path: '',
        redirectTo: 'manter',
        pathMatch: 'full'
      },
      {
        path: 'manter',
        component: EditarClienteComponent,
        data: {
          title: 'Cadastrar'
        }
      },
            {
        path: 'listar',
        component: ListarClienteComponent,
        data: {
          title: 'Listar'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {}
