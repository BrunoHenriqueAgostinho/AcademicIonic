import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParaInstituicoesPageRoutingModule } from './para-instituicoes-routing.module';

import { ParaInstituicoesPage } from './para-instituicoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParaInstituicoesPageRoutingModule
  ],
  declarations: [ParaInstituicoesPage]
})
export class ParaInstituicoesPageModule {}
