import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropriedadestrabalhoPage } from './propriedadestrabalho.page';

const routes: Routes = [
  {
    path: '',
    component: PropriedadestrabalhoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropriedadestrabalhoPageRoutingModule {}
