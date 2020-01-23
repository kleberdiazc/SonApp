import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpaquePage } from './empaque.page';

const routes: Routes = [
  {
    path: '',
    component: EmpaquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpaquePageRoutingModule {}
