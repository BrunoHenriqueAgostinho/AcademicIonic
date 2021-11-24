import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParaInstituicoesPage } from './para-instituicoes.page';

const routes: Routes = [
  {
    path: '',
    component: ParaInstituicoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParaInstituicoesPageRoutingModule {}
