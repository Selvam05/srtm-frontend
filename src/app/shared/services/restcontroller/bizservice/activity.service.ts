import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Activity001mb } from "../entities/activity001mb";


@Injectable()
export class ActivityManager extends BaseService {
    private ActivityUrl: string = `${environment.apiUrl}/activity`

    allactivity() {
        return this.getCallService(`${this.ActivityUrl}` + "/findAll");
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.ActivityUrl}`, data);
    }

    activitySave(acitivity001mb: Activity001mb) {
        return this.postCallService(`${this.ActivityUrl}` + "/save", {}, acitivity001mb);
    }

    activityUpdate(acitivity001mb: Activity001mb) {
        return this.putCallService(`${this.ActivityUrl}` + "/update", {}, acitivity001mb);
    }

    activityDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.ActivityUrl}` + "/delete", data);
    }

}