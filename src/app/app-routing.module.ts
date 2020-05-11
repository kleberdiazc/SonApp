import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPageRoutingModule } from './pages/menu/menu-routing.module';
import { MenuPageModule } from './pages/menu/menu.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'prioridad',
    loadChildren: () => import('./pages/prioridad/prioridad.module').then( m => m.PrioridadPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    MenuPageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
