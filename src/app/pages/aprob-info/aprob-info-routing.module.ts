import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprobInfoPage } from './aprob-info.page';

const routes: Routes = [
  {
    path: '',
    component: AprobInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprobInfoPageRoutingModule {}
