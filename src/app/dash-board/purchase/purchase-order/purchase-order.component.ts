import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PurchaseorderManager } from 'src/app/shared/services/restcontroller/bizservice/Purchaseorder.service';
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { SupplierQuotationManager } from 'src/app/shared/services/restcontroller/bizservice/supplierquotation.service';
import { Purchaseorder001wb } from 'src/app/shared/services/restcontroller/entities/Purchaseorder001wb';
import { Purchasereqslip001wb } from 'src/app/shared/services/restcontroller/entities/Purchasereqslip001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { saveAs } from 'file-saver';
import { Supplierquotation001wb } from 'src/app/shared/services/restcontroller/entities/supplierquotation001wb ';
import { Companydetails001mb } from 'src/app/shared/services/restcontroller/entities/Companydetails001mb';
import { CompanyDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/Companydetails.service';
import { Consignee001mb } from 'src/app/shared/services/restcontroller/entities/Consignee001mb';
import { ConsigneeManager } from 'src/app/shared/services/restcontroller/bizservice/Consignee.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  purchaseOrderForm: FormGroup | any;
  submitted = false;
  minDate = new Date();
  maxDate = new Date();
  slNo: number | any;
  companySlno: number | any;
  consigneeSlno: number | any;
  date: Date | any;
  purreqSlno: number | any;
  otherRef: string = "";
  dispatchThrough: string = "";
  destination: string = "";
  termsDelivery: string = "";
  supplierFrom: string = "";
  suppquotSlno: number | any;
  hsn: string = "";
  partNo: string = "";
  dueOn: Date | any;
  amount: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;

  quantity: number | any;
  rate: number | any;
  order: Purchaseorder001wb[] = [];
  purchasereqs: Purchasereqslip001wb[] = [];
  supplierquots: Supplierquotation001wb[] = [];
  companydetails: Companydetails001mb[] = [];
  consignees: Consignee001mb[] = [];
  

  constructor(private formBuilder: FormBuilder,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private purchaseorderManager: PurchaseorderManager,
    private purchaseregslipManager: PurchasereqslipManager,
    private supplierQuotationManager: SupplierQuotationManager,
    private companyManager: CompanyDetailsManager,
    private consigneeManager: ConsigneeManager) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

    this.purchaseregslipManager.allpurchaseslip().subscribe(response => {
      this.purchasereqs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
    });

    this.supplierQuotationManager.allSupplierQuotation().subscribe(response => {
      this.supplierquots = deserialize<Supplierquotation001wb[]>(Supplierquotation001wb, response);
    });
  
    this.companyManager.allcompany().subscribe(response => {
      this.companydetails = deserialize<Companydetails001mb[]>(Companydetails001mb, response);
     
    });

    this.consigneeManager.allconsignee().subscribe(response => {
      this.consignees = deserialize<Consignee001mb[]>(Consignee001mb, response);
    });

    this.createDataGrid001();

    this.loadData();

    this.purchaseOrderForm = this.formBuilder.group({
      companySlno: ['', Validators.required],
      consigneeSlno: ['', Validators.required],
      date: ['', Validators.required],
      purreqSlno: ['', Validators.required],
      otherRef: ['', Validators.required],
      dispatchThrough: ['', Validators.required],
      destination: ['', Validators.required],
      termsDelivery: ['', Validators.required],
      supplierFrom: ['', Validators.required],
      suppquotSlno: ['', Validators.required],
      hsn: ['', Validators.required],
      partNo: ['', Validators.required],
      dueOn: ['', Validators.required],
      amount: [''],

      quantity: [''],
      rate: [''],
    })

  }

  loadData() {
    this.purchaseorderManager.allpurchaseorder().subscribe(response => {
      this.order = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
      if (this.order.length > 0) {
        this.gridOptions?.api?.setRowData(this.order);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.purchaseOrderForm.controls }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'Invoice To',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setInvoiceTo.bind(this)
      },
      {
        headerName: 'Consignee No',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setConsigneeNo.bind(this)
      },
      {
        headerName: 'Date',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date ? this.datepipe.transform(params.data.date, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Voucher No',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setVoucherNo.bind(this)
      },
      {
        headerName: 'Reference No',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setRefNo.bind(this)
      },
      {
        headerName: 'Other Reference',
        field: "otherRef",
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Dispatch Through',
        field: 'dispatchThrough',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Destination',
        field: 'destination',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Terms Of Delivery',
        field: 'termsDelivery',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'supplier From',
        field: 'supplierFrom',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Description Of Goods',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setDescription.bind(this)
      },
      {
        headerName: 'HSN/SAC',
        field: 'hsn',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Part No',
        field: 'partNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Due On',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.dueOn ? this.datepipe.transform(params.data.dueOn, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Quantity',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setQuantity.bind(this)
      },
      {
        headerName: 'Rate',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setRate.bind(this)
      },
      {
        headerName: 'Amount',
        field: "amount",
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 85,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },

    ];
  }

  setInvoiceTo(params: any): string {
    return params.data.companySlno2 ? params.data.companySlno2.company : null;
  }

  setConsigneeNo(params: any): string {
    return params.data.consigneeSlno2 ? params.data.consigneeSlno2.consignee : null;
  }

  setVoucherNo(params: any): string {
    return params.data.purreqSlno2 ? params.data.purreqSlno2.poNo : null;
  }

  setRefNo(params: any): string {
    return params.data.purreqSlno2 ? params.data.purreqSlno2.poNo : null;
  }

  setDescription(params: any): string {
    return params.data.suppquotSlno2 ? params.data.suppquotSlno2.description : null;
  }

  setQuantity(params: any): string {
    return params.data.suppquotSlno2 ? params.data.suppquotSlno2.quantity : null;
  }

  setRate(params: any): string {
    return params.data.suppquotSlno2 ? params.data.suppquotSlno2.price : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Purchase Order";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.purchaseOrderForm.patchValue({
      'companySlno': params.data.companySlno,
      'consigneeSlno': params.data.consigneeSlno,
      'date': new Date(params.data.date),
      'purreqSlno': params.data.purreqSlno,
      'otherRef': params.data.otherRef,
      'dispatchThrough': params.data.dispatchThrough,
      'destination': params.data.destination,
      'termsDelivery': params.data.termsDelivery,
      'supplierFrom': params.data.supplierFrom,
      'suppquotSlno': params.data.suppquotSlno,
      'hsn': params.data.hsn,
      'partNo': params.data.partNo,
      'dueOn': new Date(params.data.dueOn),
      'amount': params.data.amount,

      'quantity': params.data.suppquotSlno2.quantity,
      'rate': params.data.suppquotSlno2.price,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Purchase Order";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.purchaseorderManager.purchaseorderdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.order.length; i++) {
            if (this.order[i].slNo == params.data.slNo) {
              this.order?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Purchase Order Removed Successfully");
        });
      }
    })
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onPurchaseOrderClick(event: any, purchaseOrderForm: any) {
    this.markFormGroupTouched(this.purchaseOrderForm);
    this.submitted = true;
    if (this.purchaseOrderForm.invalid) {
      return;
    }

    let purchaseorder001wb = new Purchaseorder001wb();
    purchaseorder001wb.companySlno = this.f.companySlno.value ? this.f.companySlno.value : "";
    purchaseorder001wb.consigneeSlno = this.f.consigneeSlno.value ? this.f.consigneeSlno.value : "";
    purchaseorder001wb.date = new Date(this.f.date.value);
    purchaseorder001wb.purreqSlno = this.f.purreqSlno.value ? this.f.purreqSlno.value : "";
    purchaseorder001wb.otherRef = this.f.otherRef.value ? this.f.otherRef.value : "";
    purchaseorder001wb.dispatchThrough = this.f.dispatchThrough.value ? this.f.dispatchThrough.value : "";
    purchaseorder001wb.destination = this.f.destination.value ? this.f.destination.value : "";
    purchaseorder001wb.termsDelivery = this.f.termsDelivery.value ? this.f.termsDelivery.value : "";
    purchaseorder001wb.supplierFrom = this.f.supplierFrom.value ? this.f.supplierFrom.value : "";
    purchaseorder001wb.suppquotSlno = this.f.suppquotSlno.value ? this.f.suppquotSlno.value : "";
    purchaseorder001wb.hsn = this.f.hsn.value ? this.f.hsn.value : "";
    purchaseorder001wb.partNo = this.f.partNo.value ? this.f.partNo.value : "";
    purchaseorder001wb.dueOn = new Date(this.f.dueOn.value);
    purchaseorder001wb.amount = this.f.amount.value ? this.f.amount.value : "";
    if (this.slNo) {
      purchaseorder001wb.slNo = this.slNo;
      purchaseorder001wb.insertUser = this.insertUser;
      purchaseorder001wb.insertDatetime = this.insertDatetime;
      purchaseorder001wb.updatedUser = this.authManager.getcurrentUser.username;
      purchaseorder001wb.updatedDatetime = new Date();
      this.purchaseorderManager.purchaseorderupdate(purchaseorder001wb).subscribe((response) => {
        this.calloutService.showSuccess("Purchase Order Updated Successfully");
        this.purchaseOrderForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      // purchaseorder001wb.date = new Date();
      // purchaseorder001wb.dueOn = new Date();
      purchaseorder001wb.insertUser = this.authManager.getcurrentUser.username;
      purchaseorder001wb.insertDatetime = new Date();
      this.purchaseorderManager.purchaseordersave(purchaseorder001wb).subscribe((response) => {
        this.calloutService.showSuccess("Purchase Order Saved Successfully");
        this.purchaseOrderForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.purchaseOrderForm.reset();
  }

  onSupplierClick() {
    this.purchaseOrderForm.get('suppquotSlno').valueChanges.subscribe((value: any) => {
      for (let supplierquot of this.supplierquots) {
        if (supplierquot.slNo == value) {
          this.purchaseOrderForm.patchValue({
            'quantity': supplierquot.quantity,
            'rate': supplierquot.price,
          });
          break;
        }
      }
      let quantity = this.f.quantity.value ? this.f.quantity.value : 0;
      let rate = this.f.rate.value ? this.f.rate.value : 0;
      let amount = quantity * rate;
      this.purchaseOrderForm.patchValue({
        'amount': amount,

      });
    });
  }

  onPurchaseOrderChange(event: any) {
    this.consignees = [];
    this.consigneeManager.findAllbyPurchaseOrderId(event.target.value).subscribe(response => {
        this.consignees = deserialize<Consignee001mb[]>(Consignee001mb, response);
    });
}

  onViewClick() {
    this.purchaseorderManager.purchaseorderPdf().subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    })
  }

  onGeneratePdfReport() {
    this.purchaseorderManager.purchaseorderPdf().subscribe((response) => {
      saveAs(response, "Purchase Order");
    })
  }

  onGenerateExcelReport() {
    this.purchaseorderManager.purchaseorderExcel().subscribe((response) => {
      saveAs(response, "Purchase Order");
    })
  }

}
