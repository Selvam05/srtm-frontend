import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { LineChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ColorPickerModule } from 'ngx-color-picker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AssessmentCriteriaManager } from '../shared/services/restcontroller/bizservice/AssessmentCriteria.service';
import { BreakDownRegManager } from '../shared/services/restcontroller/bizservice/breakDownRegwb.service';
import { DailyChecklistManager } from '../shared/services/restcontroller/bizservice/Dailycecklist.service';
import { MachineSettingManager } from '../shared/services/restcontroller/bizservice/machine-setting.service';
import { PreventiveChecklistManager } from '../shared/services/restcontroller/bizservice/preventivechecklist.service';
import { PreventivePlanManager } from '../shared/services/restcontroller/bizservice/preventiveplan.service';
import { SupplierAssessmentManager } from '../shared/services/restcontroller/bizservice/supplierAssessment.service';
import { SupplierAuditManager } from '../shared/services/restcontroller/bizservice/supplierAudit.service';
import { SupplierRegManager } from '../shared/services/restcontroller/bizservice/supplierReg.service';
import { SupplierTrainingPlanManager } from '../shared/services/restcontroller/bizservice/suppliertrainingplan.service';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';
import { DataSharedService } from '../shared/services/services/datashared.service';
import { AdvancepieChartComponent } from './body/advancepie-chart/advancepie-chart.component';
import { BodyComponent } from './body/body.component';
import { ComboChartComponent } from './body/combo-chart/combo-chart.component';
import { DoughnutChartComponent } from './body/doughnut-chart/doughnut-chart.component';
import { PiegridChartComponent } from './body/piegrid-chart/piegrid-chart.component';
import { PolarChartComponent } from './body/polar-chart/polar-chart.component';
import { ProductChartComponent } from './body/product-chart/product-chart.component';
import { RealtimeChartComponent } from './body/realtime-chart/realtime-chart.component';
import { SalebarChartComponent } from './body/salebar-chart/salebar-chart.component';
import { SalegaugeChartComponent } from './body/salegauge-chart/salegauge-chart.component';
import { SalelineChartComponent } from './body/saleline-chart/saleline-chart.component';
import { SalepieChartComponent } from './body/salepie-chart/salepie-chart.component';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { DashboardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SupplierMasterComponent } from './supplier-master/supplier-master.component';
import { SupplierComponent } from './supplier/supplier.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Maps from 'fusioncharts/fusioncharts.maps';
import * as World from 'fusioncharts/maps/fusioncharts.world';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
FusionChartsModule.fcRoot(FusionCharts, Maps, World, Charts, FusionTheme);


// import { GoJsChartComponent } from './body/go-js-chart/go-js-chart.component';


// import {NgxCumulioComponent} from 'ngx-cumulio';


@NgModule({

    declarations: [
        DashBoardComponent,
        HeaderComponent,
        FooterComponent,
        SideMenuComponent,
        BodyComponent,
        SupplierComponent,
        SupplierMasterComponent,
        ProductChartComponent,
        DoughnutChartComponent,
        SalebarChartComponent,
        SalegaugeChartComponent,
        SalepieChartComponent,
        RealtimeChartComponent,
        AdvancepieChartComponent,
        PiegridChartComponent,
        PolarChartComponent,
        SalelineChartComponent,
        ComboChartComponent,
    ],

    imports: [
        FormsModule,
        // BarChartModule,
        LineChartModule,
        NgxChartsModule,
        ChartsModule,
        NgApexchartsModule,
        // D3Module, 
        // MatDividerModule,
        // MatToolbarModule,
        PerfectScrollbarModule,
        ProgressbarModule.forRoot(),
        RoundProgressModule,
        TranslateModule.forRoot(),
        BreadcrumbModule,
        MatMenuModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        ColorPickerModule,
        DashboardRoutingModule,
        FusionChartsModule
    ],
    providers: [DataSharedService,
         MachineSettingManager, 
         UserManager,
         PreventivePlanManager, 
         PreventiveChecklistManager, 
         DailyChecklistManager, 
         BreakDownRegManager, 
         SupplierRegManager, 
         AssessmentCriteriaManager,
         SupplierAssessmentManager,
         SupplierAuditManager,
         SupplierTrainingPlanManager],
    exports: [NgbCollapseModule],
})
export class DashboardModule { }

