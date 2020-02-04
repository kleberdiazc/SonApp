import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'empaque',
        loadChildren: () => import('../empaque/empaque.module').then( m => m.EmpaquePageModule)
      },
      {
        path: 'empaque-list',
        loadChildren: () => import('../empaque-list/empaque-list.module').then( m => m.EmpaqueListPageModule)
      },
      {
        path: 'full',
        redirectTo: '/menu/inicio'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
