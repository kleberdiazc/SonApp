import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrioridadPage } from './prioridad.page';

const routes: Routes = [
  {
    path: '',
    component: PrioridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrioridadPageRoutingModule {}
