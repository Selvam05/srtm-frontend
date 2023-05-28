import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { MaterialInwardRecordComponent } from './material-inward-record/material-inward-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AgGridModule } from 'ag-grid-angular';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CalendarModule } from 'primeng/calendar';
import { StoreComponent } from './store.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { MaterialInwardManager } from 'src/app/shared/services/restcontroller/bizservice/Materialinward.service';
import { MaterialReqSlipComponent } from './material-req-slip/material-req-slip.component';
import { MaterialRequisitionManager } from 'src/app/shared/services/restcontroller/bizservice/material-req-slip.service';
import { SparesettingManager } from 'src/app/shared/services/restcontroller/bizservice/sparesetting.service';


@NgModule({
  declarations: [
    StoreComponent,
    MaterialInwardRecordComponent,
    MaterialReqSlipComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
    MatTabsModule,
    CalendarModule
  ],
  providers: [
    PurchaseorderManager,
    MaterialInwardManager,
    DatePipe,
    MaterialRequisitionManager,
    SparesettingManager 
  ]
})
export class StoreModule { }
