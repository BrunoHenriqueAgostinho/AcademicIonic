import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropriedadestrabalhoPageRoutingModule } from './propriedadestrabalho-routing.module';

import { PropriedadestrabalhoPage } from './propriedadestrabalho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropriedadestrabalhoPageRoutingModule
  ],
  declarations: [PropriedadestrabalhoPage]
})
export class PropriedadestrabalhoPageModule {}
