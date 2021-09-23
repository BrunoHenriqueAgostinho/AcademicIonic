import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepageSystemPageRoutingModule } from './homepage-system-routing.module';

import { HomepageSystemPage } from './homepage-system.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepageSystemPageRoutingModule
  ],
  declarations: [HomepageSystemPage]
})
export class HomepageSystemPageModule {}
