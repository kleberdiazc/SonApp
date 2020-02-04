import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpaqueListPageRoutingModule } from './empaque-list-routing.module';

import { EmpaqueListPage } from './empaque-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpaqueListPageRoutingModule
  ],
  declarations: [EmpaqueListPage]
})
export class EmpaqueListPageModule {}
