import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ConsigneeDetailsComponent } from './consignee-details/consignee-details.component';
import { PurchaseMasterComponent } from './purchase-master.component';

const routes: Routes = [{
  path: "",
  component: PurchaseMasterComponent,
  children: [
    {
      path: "app-company-details",
      component: CompanyDetailsComponent
    },
    {
      path: "app-consignee-details",
      component: ConsigneeDetailsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseMasterRoutingModule { }
