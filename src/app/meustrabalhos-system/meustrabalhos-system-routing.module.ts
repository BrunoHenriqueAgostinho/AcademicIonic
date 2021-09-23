import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeustrabalhosSystemPage } from './meustrabalhos-system.page';

const routes: Routes = [
  {
    path: '',
    component: MeustrabalhosSystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeustrabalhosSystemPageRoutingModule {}
