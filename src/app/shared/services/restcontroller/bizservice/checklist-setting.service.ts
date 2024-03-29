import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Checklist001mb } from "../entities/Checklist001mb";

@Injectable()
export class ChecklistSettingManager extends BaseService {
    private checklistUrl: string = `${environment.apiUrl}/checklist`

    allchecklist() {
        return this.getCallService(`${this.checklistUrl}` + "/findAll");
    }

    checklistsave(checklist001mb: Checklist001mb) {
        
        return this.postCallService(`${this.checklistUrl}` + "/save", {}, checklist001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.checklistUrl}`, data);
    }


    checklistupdate(checklist001mb: Checklist001mb) {
        return this.putCallService(`${this.checklistUrl}` + "/update", {}, checklist001mb);
    }

    checklistdelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.checklistUrl}`+"/delete", data);
    }
}