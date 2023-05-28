import { Companydetails001mb } from "./Companydetails001mb";
import { Consignee001mb } from "./Consignee001mb";
import { Salesorder001wb } from "./Salesorder001wb";
import { Supplierquotation001wb } from "./supplierquotation001wb ";


export class Purchaseorder001wb {
    slNo?: number;
    companySlno?: number;
    consigneeSlno?: number;
    date?: Date;
    purreqSlno?: number;
    otherRef?: string;
    dispatchThrough?: string;
    destination?: string;
    termsDelivery?: string;
    supplierFrom?: string;
    suppquotSlno?: number;
    hsn?: string;
    partNo?: string;
    dueOn?: Date;
    amount?: number;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    suppquotSlno2? : Supplierquotation001wb
    porderSlno2? : Salesorder001wb;
    companySlno2?: Companydetails001mb;
    consigneeSlno2?: Consignee001mb;
}