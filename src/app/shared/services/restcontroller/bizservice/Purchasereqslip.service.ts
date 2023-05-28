import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purchasereqslip001wb } from "../entities/Purchasereqslip001wb";


@Injectable()
export class PurchasereqslipManager extends BaseService {
   
    private PurchasereqslipUrl: string = `${environment.apiUrl}/purchasereq`

    allpurchaseslip() {
        return this.getCallService(`${this.PurchasereqslipUrl}`+"/findAll");
    }

    purchaseslipsave(purchasereqslip001wb: Purchasereqslip001wb) {
        return this.postCallService(`${this.PurchasereqslipUrl}` + "/save", {}, purchasereqslip001wb);
    }

    purchaseslipupdate(purchasereqslip001wb: Purchasereqslip001wb) {
        return this.putCallService(`${this.PurchasereqslipUrl}` + "/update", {}, purchasereqslip001wb);
    }

    purchaseslipdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.PurchasereqslipUrl}`+"/delete",data);
    }
}