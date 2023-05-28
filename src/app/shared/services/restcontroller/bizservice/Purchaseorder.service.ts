import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purchaseorder001wb } from "../entities/Purchaseorder001wb";



@Injectable()
export class PurchaseorderManager extends BaseService {
   
    private PurchaseorderUrl: string = `${environment.apiUrl}/order`

    allpurchaseorder() {
        return this.getCallService(`${this.PurchaseorderUrl}`+"/findAll");
    }

    purchaseordersave(purchaseorder001wb: Purchaseorder001wb) {
        return this.postCallService(`${this.PurchaseorderUrl}` + "/save", {}, purchaseorder001wb);
    }

    purchaseorderupdate(purchaseorder001wb: Purchaseorder001wb) {
        return this.putCallService(`${this.PurchaseorderUrl}` + "/update", {}, purchaseorder001wb);
    }

    purchaseorderdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.PurchaseorderUrl}`+"/delete",data);
    }

    purchaseorderPdf() {
        return this.getCallService1(`${this.PurchaseorderUrl}` + "/pdf")
    }

    purchaseorderExcel() {
        return this.getCallService1(`${this.PurchaseorderUrl}` + "/excel")
    }

    findAllbySalesOrderId(id: any) {
        let saleslno: any = {};
        saleslno['saleslno'] = id;
        return this.deleteCallService(`${this.PurchaseorderUrl}`+"/delete",saleslno);
    }
}