import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeustrabalhosSystemPageRoutingModule } from './meustrabalhos-system-routing.module';

import { MeustrabalhosSystemPage } from './meustrabalhos-system.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeustrabalhosSystemPageRoutingModule
  ],
  declarations: [MeustrabalhosSystemPage]
})
export class MeustrabalhosSystemPageModule {}
