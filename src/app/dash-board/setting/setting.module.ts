import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RoleManager } from 'src/app/shared/services/restcontroller/bizservice/role.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';



@NgModule({
  declarations: [ SettingComponent,],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NgxFileDropModule,
    FormsModule,
  ],
  providers: [
    UserManager,RoleManager
  ]
})

export class SettingModule { }
