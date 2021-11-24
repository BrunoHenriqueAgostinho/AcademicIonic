import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParaEstudantesPage } from './para-estudantes.page';

const routes: Routes = [
  {
    path: '',
    component: ParaEstudantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParaEstudantesPageRoutingModule {}
