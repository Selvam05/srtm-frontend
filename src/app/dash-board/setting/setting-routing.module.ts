import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';

const routes: Routes = [
    {
        path: "",
        component: SettingComponent,
        children: [
            {
                path: 'app-profile',
                loadChildren: () => import("./profile/profile.module").then(m => m.ProfileModule)
            },
            {
                path: 'app-settings',
                loadChildren: () => import("./settings/settings.module").then(m => m.SettingsModule)
            },
           {
                path: 'app-user-theme',
                loadChildren: () => import("./user-theme/user-theme.module").then(m => m.UserThemeModule)
            },
           
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
