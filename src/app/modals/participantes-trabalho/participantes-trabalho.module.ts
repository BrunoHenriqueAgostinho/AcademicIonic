import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticipantesTrabalhoPageRoutingModule } from './participantes-trabalho-routing.module';

import { ParticipantesTrabalhoPage } from './participantes-trabalho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipantesTrabalhoPageRoutingModule
  ],
  declarations: [ParticipantesTrabalhoPage]
})
export class ParticipantesTrabalhoPageModule {}
