import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplierquotation001wb } from "../entities/supplierquotation001wb ";



@Injectable()
export class SupplierQuotationManager extends BaseService {
    private SupplierQuotationUrl: string = `${environment.apiUrl}/supquotation`

    allSupplierQuotation() {
        return this.getCallService(`${this.SupplierQuotationUrl}` + "/findAll");
    }

    // findOne(id: any) {
    //     let data: any = {};
    //     data['id'] = id;
    //     return this.getCallService(`${this.SupplierQuotationUrl}`, data);
    // }

    SupplierQuotationSave(supplierquotation001wb: Supplierquotation001wb) {
        return this.postCallService(`${this.SupplierQuotationUrl}` + "/save", {}, supplierquotation001wb);
    }

    SupplierQuotationUpdate(supplierquotation001wb: Supplierquotation001wb) {
        return this.putCallService(`${this.SupplierQuotationUrl}` + "/update", {}, supplierquotation001wb);
    }

    SupplierQuotationDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.SupplierQuotationUrl}` + "/delete", data);
    }

}