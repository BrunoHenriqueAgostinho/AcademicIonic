import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageSystemPage } from './homepage-system.page';

const routes: Routes = [
  {
    path: '',
    component: HomepageSystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageSystemPageRoutingModule {}
