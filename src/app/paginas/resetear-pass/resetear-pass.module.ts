import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetearPassPageRoutingModule } from './resetear-pass-routing.module';

import { ResetearPassPage } from './resetear-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetearPassPageRoutingModule
  ],
  declarations: [ResetearPassPage]
})
export class ResetearPassPageModule {}
