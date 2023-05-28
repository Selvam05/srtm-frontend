import { transition, trigger, useAnimation } from '@angular/animations';
import {
    Component,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { SearchFilter } from 'src/app/shared/pipe/search-filter';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MachineSettingManager } from 'src/app/shared/services/restcontroller/bizservice/machine-setting.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { Machine001mb } from 'src/app/shared/services/restcontroller/entities/Machine001mb';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';
import { SidebarCloseAnimation, SidebarOpenAnimation } from './animations';
const animationParams = {
    menuWidth: '70px',
    animationStyle: '1500ms linear',
};
@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css'],
    animations: [
        trigger('sideMenu', [
            transition(':enter', [
                useAnimation(SidebarOpenAnimation, {
                    params: {
                        ...animationParams,
                    },
                }),
            ]),
            transition(':leave', [
                useAnimation(SidebarCloseAnimation, {
                    params: {
                        ...animationParams,
                    },
                }),
            ]),
        ]),
    ],
})
export class SideMenuComponent implements OnChanges, OnInit {
    @ViewChild('sidenav') public sidenav!: MatSidenav;
    @Input() openNav: boolean | undefined;
    private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
    isCollapsed: boolean = true;
    smallScreen: boolean = true;
    sideNavMode: string | undefined;
    navMode: string | undefined;
    disableClose: boolean | undefined;
    screenWidth!: number;
    parentMenuString: string = '';
    childMenuString: string = '';
    temporaryDisabled: boolean = true;
    isShow: boolean = true;
    mcode: string = "";
    supplierCode: string = "";
    searchStr: string = "";
    machineSetting: Machine001mb[] = [];
    machine001mbs?: Machine001mb[] = [];
    currentMachine001mbs?: Machine001mb[] = [];
    supplierReg?: Supplierregistration001mb[] = [];
    currentSupplierReg?: Supplierregistration001mb[] = [];
    supplierreg001mb?: Supplierregistration001mb;
    machine001mb?: Machine001mb;
    hexToRgb: any;
    rgbToHex: any;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    toggle() {
        this.temporaryDisabled = true;
        this.sidenav.toggle();
        setTimeout(() => {
            this.temporaryDisabled = false;
        }, 10);
    }
    constructor(
        private machineSettingManager: MachineSettingManager,
        private dataSharedService: DataSharedService,
        private authManager: AuthManager,
        private calloutService: CalloutService,
        private router: Router,
        private authManger: AuthManager,
        private route: ActivatedRoute,
        private supplierRegManager: SupplierRegManager,
        public searchFilter: SearchFilter
    ) { }
    @HostListener('window:resize', ['$event'])
    onResize(_event: any) {
        this.configureSideNav();
    }
    configureSideNav() {
        // this.smallScreen = window.innerWidth < 641 ? true : false;
        // if (!this.smallScreen) {
        //     this.sidenav.mode = "side"
        //     this.sidenav.opened = true
        // }
        // else {
        //     this.sidenav.mode = 'over'
        //     this.sidenav.opened = false
        // }
    }
    closeAllSidenav() {
        this.sidenav.close();
    }
    ngOnChanges() {
        // this.isCollapsed = false;
        // if (!this.openNav) {
        //  this.sidenav.open();
        // }
        // else if (this.sidenav) {
        //  this.sidenav.close();
        // }
    }
    ngOnInit() {
        this.machineSettingManager.findAllSlNoAndMcode().subscribe((response: any) => {
          
            this.machine001mbs = deserialize<Machine001mb[]>(Machine001mb, response);
            console.log("response", this.machine001mbs);
            this.currentMachine001mbs = [];
            for (let machine001mb of this.machine001mbs) {
                this.currentMachine001mbs.push(machine001mb);
            }
        });

        this.supplierRegManager.findAllSlNoAndSuppcode().subscribe((response: any) => {
            this.supplierReg = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, response);
            this.currentSupplierReg = [];
            for (let supplierregistration001mb of this.supplierReg) {
                this.currentSupplierReg.push(supplierregistration001mb);
            }
        });

        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });

        this.dataSharedService.currentSearchObject.subscribe((object: any) => {
            if (object) {
                this.searchStr = object;
                this.currentMachine001mbs = [];
                if (this.machine001mbs && this.machine001mbs.length > 0) {
                    for (let machine001mb of this.machine001mbs) {
                        if (this.searchStr && machine001mb.mcode?.toLocaleLowerCase().startsWith(this.searchStr)) {
                            this.currentMachine001mbs.push(machine001mb);
                        }
                    }
                }
            }
        });

        this.dataSharedService.currentSearchItemObject.subscribe((object: any) => {
            if (object) {
                this.searchStr = object;
                this.currentSupplierReg = [];
                if (this.supplierReg && this.supplierReg.length > 0) {
                    for (let supplierreg001mb of this.supplierReg) {
                        if (this.searchStr && supplierreg001mb.supplierCode?.toLocaleLowerCase().startsWith(this.searchStr)) {
                            this.currentSupplierReg.push(supplierreg001mb);
                        }
                    }
                }
            }
        });

        this.dataSharedService.currentSearchMenuObject.subscribe((object: any) => {
            if (object) {
                this.searchStr = object;
                this.currentMachine001mbs = [];
                if (this.machine001mbs && this.machine001mbs.length > 0) {
                    for (let machine001mb of this.machine001mbs) {
                        if (this.searchStr && machine001mb.mcode?.toLocaleLowerCase().startsWith(this.searchStr)) {
                            this.currentMachine001mbs.push(machine001mb);
                        }
                    }
                }
            }
        });

        this.dataSharedService.currentSearchMenuItemObject.subscribe((object: any) => {
            if (object) {
                this.searchStr = object;
                this.currentSupplierReg = [];
                if (this.supplierReg && this.supplierReg.length > 0) {
                    for (let supplierreg001mb of this.supplierReg) {
                        if (this.searchStr && supplierreg001mb.supplierCode?.toLocaleLowerCase().startsWith(this.searchStr)) {
                            this.currentSupplierReg.push(supplierreg001mb);
                        }
                    }
                }
            }
        });

        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
        //Getting Width size//
        this.screenWidth$.subscribe((width) => {
            this.screenWidth = width;
        });

        this.dataSharedService.currentSideNavObject.subscribe(
            (isShow: boolean) => {
                isShow = isShow;
                if (this.sidenav && !isShow) {
                    this.sidenav.open();
                } else if (this.sidenav) {
                    this.sidenav.close();
                }
            }
        );
        this.authManager.currentUserSubject.subscribe((object: any) => {
            // this.colorthemes = object.theme;
        });
    }
    // onMenuClick(machine001mb: Machine001mb) {
    //     this.router.navigate(['../app-machines/app-preventive-maintenance-plan']);
    //     // this.router.navigate(['../app-machines/app-preventive-maintenance-plan', { relativeTo: this.route.parent }]);
    //     // this.router.navigateByUrl('./app-machines/app-preventive-maintenance-plan');
    // }

    ngAfterViewInit() {
        this.temporaryDisabled = false;
    }
    onMenuParentClick(parentMenuString: string, childMenuString: string = '') {
        this.parentMenuString = parentMenuString;
        this.childMenuString = childMenuString;
        let object: any = new Object();
        object.parentMenuString = this.parentMenuString;
        object.childMenuString = '';
        this.dataSharedService.changeMenuAction(object);
    }
    onMenuChildClick(parentMenuString: string, childMenuString: string) {
        this.parentMenuString = parentMenuString;
        this.childMenuString = childMenuString;
        let object: any = new Object();
        object.parentMenuString = this.parentMenuString;
        object.childMenuString = this.childMenuString;
        this.dataSharedService.changeMenuAction(object);
    }
    onClick(event: any) {
        this.isShow = !this.isShow;
    }

}
function toLocaleLowerCase() {
    throw new Error('Function not implemented.');
}

