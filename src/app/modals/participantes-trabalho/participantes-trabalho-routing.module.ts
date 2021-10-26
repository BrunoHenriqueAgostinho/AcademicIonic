import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipantesTrabalhoPage } from './participantes-trabalho.page';

const routes: Routes = [
  {
    path: '',
    component: ParticipantesTrabalhoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantesTrabalhoPageRoutingModule {}
