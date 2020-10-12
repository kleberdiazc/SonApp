import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprobReqPageRoutingModule } from './aprob-req-routing.module';

import { AprobReqPage } from './aprob-req.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AprobInfoPage } from '../aprob-info/aprob-info.page';
import { AprobInfoPageModule } from '../aprob-info/aprob-info.module';

@NgModule({
  entryComponents: [
    AprobInfoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprobReqPageRoutingModule,
    NgxDatatableModule,
    AprobInfoPageModule
  ],
  declarations: [AprobReqPage]
})
export class AprobReqPageModule {}
