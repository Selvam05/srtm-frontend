import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialInwardRecordComponent } from './material-inward-record/material-inward-record.component';
import { MaterialReqSlipComponent } from './material-req-slip/material-req-slip.component';
import { StoreComponent } from './store.component';

const routes: Routes = [
  {
    path: "",
    component: StoreComponent,
    children: [
      {
        path: "app-material-inward-record",
        component: MaterialInwardRecordComponent
      },
      {
        path: "app-material-req-slip",
        component: MaterialReqSlipComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
