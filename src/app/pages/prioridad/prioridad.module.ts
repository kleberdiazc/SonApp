import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrioridadPageRoutingModule } from './prioridad-routing.module';

import { PrioridadPage } from './prioridad.page';
import { PipesModule } from '../../pipes/pipes.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PrioridadPageRoutingModule,
    AutocompleteLibModule
  ],
  declarations: [PrioridadPage]
})
export class PrioridadPageModule {}
