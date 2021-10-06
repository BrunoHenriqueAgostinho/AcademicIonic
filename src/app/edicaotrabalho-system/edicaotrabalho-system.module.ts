import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicaotrabalhoSystemPageRoutingModule } from './edicaotrabalho-system-routing.module';

import { EdicaotrabalhoSystemPage } from './edicaotrabalho-system.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicaotrabalhoSystemPageRoutingModule
  ],
  declarations: [EdicaotrabalhoSystemPage]
})
export class EdicaotrabalhoSystemPageModule {}
