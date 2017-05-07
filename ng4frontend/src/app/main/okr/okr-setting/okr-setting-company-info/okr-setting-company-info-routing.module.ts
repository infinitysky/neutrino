import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OkrSettingCompanyInfoComponent } from './okr-setting-company-info.component';
const routes: Routes = [
  {
    path: '',
    component: OkrSettingCompanyInfoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OkrSettingCompanyInfoRoutingModule { }
