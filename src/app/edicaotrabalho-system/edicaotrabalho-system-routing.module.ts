import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdicaotrabalhoSystemPage } from './edicaotrabalho-system.page';

const routes: Routes = [
  {
    path: '',
    component: EdicaotrabalhoSystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicaotrabalhoSystemPageRoutingModule {}
