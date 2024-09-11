import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetearPassPage } from './resetear-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ResetearPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetearPassPageRoutingModule {}
