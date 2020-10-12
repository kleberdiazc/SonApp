import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprobInfoPageRoutingModule } from './aprob-info-routing.module';

import { AprobInfoPage } from './aprob-info.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule
  ],
  declarations: [AprobInfoPage]
})
export class AprobInfoPageModule {}
