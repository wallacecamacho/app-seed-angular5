import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarClienteComponent } from './app-modules/cliente/manter/components/editar-cliente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cliente',
    component: EditarClienteComponent,
  }, {
   path: '**',
   redirectTo: '**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
