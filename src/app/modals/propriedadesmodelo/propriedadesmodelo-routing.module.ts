import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropriedadesmodeloPage } from './propriedadesmodelo.page';

const routes: Routes = [
  {
    path: '',
    component: PropriedadesmodeloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropriedadesmodeloPageRoutingModule {}
