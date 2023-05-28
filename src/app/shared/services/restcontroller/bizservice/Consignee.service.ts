import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Consignee001mb } from "../entities/Consignee001mb";



@Injectable()
export class ConsigneeManager extends BaseService {

    private ConsigneeUrl: string = `${environment.apiUrl}/consignee`

    allconsignee() {
        return this.getCallService(`${this.ConsigneeUrl}` + "/findAll");
    }

    findAllbyPurchaseOrderId(slNo: any) {
        let poslNo: any = {};
        poslNo['slNo'] = slNo;
        return this.getCallService(`${this.ConsigneeUrl}` + "/findAllbyPurchaseOrderId", poslNo);
    }

    consigneeSave(consignee001mb: Consignee001mb) {
        return this.postCallService(`${this.ConsigneeUrl}` + "/save", {}, consignee001mb);
    }

    consigneeUpdate(consignee001mb: Consignee001mb) {
        return this.putCallService(`${this.ConsigneeUrl}` + "/update", {}, consignee001mb);
    }

    consigneeDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.ConsigneeUrl}` + "/delete", data);
    }

}