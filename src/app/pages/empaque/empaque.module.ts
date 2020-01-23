import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpaquePageRoutingModule } from './empaque-routing.module';

import { EmpaquePage } from './empaque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpaquePageRoutingModule
  ],
  declarations: [EmpaquePage]
})
export class EmpaquePageModule {}
