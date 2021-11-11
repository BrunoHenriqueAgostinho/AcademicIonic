import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropriedadesmodeloPageRoutingModule } from './propriedadesmodelo-routing.module';

import { PropriedadesmodeloPage } from './propriedadesmodelo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropriedadesmodeloPageRoutingModule
  ],
  declarations: [PropriedadesmodeloPage]
})
export class PropriedadesmodeloPageModule {}
