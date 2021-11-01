import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizartrabalhoPageRoutingModule } from './visualizartrabalho-routing.module';

import { VisualizartrabalhoPage } from './visualizartrabalho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizartrabalhoPageRoutingModule
  ],
  declarations: [VisualizartrabalhoPage]
})
export class VisualizartrabalhoPageModule {}
