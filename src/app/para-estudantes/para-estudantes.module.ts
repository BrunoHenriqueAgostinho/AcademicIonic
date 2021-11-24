import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParaEstudantesPageRoutingModule } from './para-estudantes-routing.module';

import { ParaEstudantesPage } from './para-estudantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParaEstudantesPageRoutingModule
  ],
  declarations: [ParaEstudantesPage]
})
export class ParaEstudantesPageModule {}
