import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DashBoardComponent } from './dash-board.component';

const routes: Routes = [
  {
    path: "",
    component: DashBoardComponent,
    children: [
      {
        path: "",
        component: BodyComponent,
      },
      {
        path: 'app-manufacture-setting',
        loadChildren: () => import("./manufacture-setting/manufacture-setting.module").then(m => m.ManufactureSettingModule)
      },
      {
        path: 'app-setting',
        loadChildren: () => import("./setting/setting.module").then(m => m.SettingModule)
      },
      {
        path: "app-machines",
        loadChildren: () => import("./machines/machines.module").then(m => m.MachinesModule)
      },
      {
        path: "app-supplier",
        loadChildren: () => import("./supplier/supplier.module").then(m => m.SupplierModule)
      },
      {
        path: "app-supplier-master",
        loadChildren: () => import("./supplier-master/supplier-master.module").then(m => m.SupplierMasterModule)
      },
      {
        path: "app-purchase",
        loadChildren: () => import("./purchase/purchase.module").then(m => m.PurchaseModule)
      },
      {
        path: "app-store",
        loadChildren: () => import("./store/store.module").then(m => m.StoreModule)
      },
      {
        path: "app-purchase-master",
        loadChildren: () => import("./purchase-master/purchase-master.module").then(m => m.PurchaseMasterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
