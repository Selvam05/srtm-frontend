import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Preventivechecklist001wb } from "../entities/preventivechecklist001wb";

@Injectable()
export class PreventiveChecklistManager extends BaseService {
    private preventivechecklistUrl: string = `${environment.apiUrl}/preventivechecklist`

    allpreventchecklist() {
        return this.getCallService(`${this.preventivechecklistUrl}` + "/findAll");
    }

    findAllByMachineId(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService(`${this.preventivechecklistUrl}` + "/findAllByMachineId", mslno);
    }

    preventchecklistsave(preventivechecklist001wb: Preventivechecklist001wb[]=[]) {
        return this.postCallService(`${this.preventivechecklistUrl}` + "/save", {}, preventivechecklist001wb);
    }

    preventchecklistupdate(preventivechecklist001wb: Preventivechecklist001wb) {
        return this.putCallService(`${this.preventivechecklistUrl}` + "/update", {}, preventivechecklist001wb);
    }

    preventchecklistdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.preventivechecklistUrl}`+"/delete", data);
    }
    preCheckPdf(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.preventivechecklistUrl}` + "/pdf", mslNo)
    }
    preCheckExcel(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.preventivechecklistUrl}` + "/excel", mslNo)
    }
}