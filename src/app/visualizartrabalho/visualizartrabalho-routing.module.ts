import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizartrabalhoPage } from './visualizartrabalho.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizartrabalhoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizartrabalhoPageRoutingModule {}
