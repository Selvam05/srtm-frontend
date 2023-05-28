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
import { PurchasereqslipManager } from 'src/app/shared/services/restcontroller/bizservice/Purchasereqslip.service';
import { SupplierQuotationManager } from 'src/app/shared/services/restcontroller/bizservice/supplierquotation.service';
import { SupplierRegManager } from 'src/app/shared/services/restcontroller/bizservice/supplierReg.service';
import { Purchasereqslip001wb } from 'src/app/shared/services/restcontroller/entities/Purchasereqslip001wb';
import { Supplierquotation001wb } from 'src/app/shared/services/restcontroller/entities/supplierquotation001wb ';
import { Supplierregistration001mb } from 'src/app/shared/services/restcontroller/entities/supplierRegistration001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-supplier-quotation',
  templateUrl: './supplier-quotation.component.html',
  styleUrls: ['./supplier-quotation.component.css']
})
export class SupplierQuotationComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  PurchaseQuotationForm: FormGroup | any;
  submitted = false;
  slNo: number | any;
  purchasereqSlno: number | any;
  supplierSlno: number | any;
  address: string | null = "";
  quotationNo: string | null = "";
  quotationDate: Date | any;
  validity: Date | any;
  personName: string | null = "";
  description: string | null = "";
  quantity: number | any;
  price: number | any;
  number: number | any;
  mailId: string | null = "";
  termsCondition: string | null = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  minDate = new Date();
  maxDate = new Date();
  supplierquotations: Supplierquotation001wb[] = [];
  purchasereqs: Purchasereqslip001wb[] = [];
  supplierregs: Supplierregistration001mb[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private supplierQuotationManager: SupplierQuotationManager,
    private supplierRegManager: SupplierRegManager,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private purchaseregslipManager: PurchasereqslipManager) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

    this.purchaseregslipManager.allpurchaseslip().subscribe(response => {
      this.purchasereqs = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
    });

    this.supplierRegManager.allSupplier().subscribe(response => {
      this.supplierregs = deserialize<Supplierregistration001mb[]>(Supplierregistration001mb, response);
    });
    this.createDataGrid001();

    this.loadData();

    this.PurchaseQuotationForm = this.formBuilder.group({
      purchasereqSlno: ['', Validators.required],
      supplierSlno: ['', Validators.required],
      address: ['', Validators.required],
      quotationNo: ['', Validators.required],
      quotationDate: ['', Validators.required],
      validity: ['', Validators.required],
      personName: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      number: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
      mailId: ['', Validators.required],
      termsCondition: ['', Validators.required],
    })
  }


  loadData() {
    this.supplierQuotationManager.allSupplierQuotation().subscribe(response => {
      this.supplierquotations = deserialize<Supplierquotation001wb[]>(Supplierquotation001wb, response);
      if (this.supplierquotations.length > 0) {
        this.gridOptions?.api?.setRowData(this.supplierquotations);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.PurchaseQuotationForm.controls }

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
        headerName: 'Supplier Name',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setSupplierName.bind(this)
      },
      {
        headerName: 'Address',
        field: 'address',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Quotation No',
        field: 'quotationNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Quotation Date',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.quotationDate ? this.datepipe.transform(params.data.quotationDate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Validity',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.validity ? this.datepipe.transform(params.data.validity, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Product Name',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setProductName.bind(this)
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setSpares.bind(this)
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Price',
        field: 'price',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Contact Person Name',
        field: 'personName',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Phone No',
        field: 'number',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Mail Id',
        field: 'mailId',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Terms and Conditions',
        field: 'termsCondition',
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

  setProductName(params: any): string {
    return params.data.purchasereqSlno2 ? params.data.purchasereqSlno2.sparenameSlno : null;
  }

  setSupplierName(params: any): string {
    return params.data.supplierSlno2 ? params.data.supplierSlno2.supplierName : null;
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Supplier Quotation";
    modalRef.componentInstance.details = params.data
  }

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.PurchaseQuotationForm.patchValue({
      'purchasereqSlno': params.data.purchasereqSlno,
      'supplierSlno': params.data.supplierSlno,
      'address': params.data.address,
      'quotationNo': params.data.quotationNo,
      'quotationDate': new Date(params.data.quotationDate),
      'validity': new Date(params.data.validity),
      'personName': params.data.personName,
      'description': params.data.description,
      'quantity': params.data.quantity,
      'price': params.data.price,
      'number': params.data.number,
      'mailId': params.data.mailId,
      'termsCondition': params.data.termsCondition,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Supplier Quotation";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.supplierQuotationManager.SupplierQuotationDelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.supplierquotations.length; i++) {
            if (this.supplierquotations[i].slNo == params.data.slNo) {
              this.supplierquotations?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Supplier Quotation Removed Successfully");
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

  onSupplierQuotationClick(event: any, PurchaseQuotationForm: any) {
    this.markFormGroupTouched(this.PurchaseQuotationForm);
    this.submitted = true;
    if (this.PurchaseQuotationForm.invalid) {
      return;
    }

    let supplierquotation001wb = new Supplierquotation001wb();
    supplierquotation001wb.purchasereqSlno = this.f.purchasereqSlno.value ? this.f.purchasereqSlno.value : "";
    supplierquotation001wb.supplierSlno = this.f.supplierSlno.value ? this.f.supplierSlno.value : "";
    supplierquotation001wb.address = this.f.address.value ? this.f.address.value : "";
    supplierquotation001wb.quotationNo = this.f.quotationNo.value ? this.f.quotationNo.value : "";
    supplierquotation001wb.quotationDate = new Date(this.f.quotationDate.value);
    supplierquotation001wb.validity = new Date(this.f.validity.value);
    supplierquotation001wb.personName = this.f.personName.value ? this.f.personName.value : "";
    supplierquotation001wb.description = this.f.description.value ? this.f.description.value : "";
    supplierquotation001wb.quantity = this.f.quantity.value ? this.f.quantity.value : "";
    supplierquotation001wb.price = this.f.price.value ? this.f.price.value : "";
    supplierquotation001wb.number = this.f.number.value ? this.f.number.value : "";
    supplierquotation001wb.mailId = this.f.mailId.value ? this.f.mailId.value : "";
    supplierquotation001wb.termsCondition = this.f.termsCondition.value ? this.f.termsCondition.value : "";
    if (this.slNo) {
      supplierquotation001wb.slNo = this.slNo;
      supplierquotation001wb.insertUser = this.insertUser;
      supplierquotation001wb.insertDatetime = this.insertDatetime;
      supplierquotation001wb.updatedUser = this.authManager.getcurrentUser.username;
      supplierquotation001wb.updatedDatetime = new Date();
      this.supplierQuotationManager.SupplierQuotationUpdate(supplierquotation001wb).subscribe((response) => {
        this.calloutService.showSuccess("Supplier Quotation Updated Successfully");
        this.PurchaseQuotationForm.reset();
        this.loadData();
        this.slNo = null;
        this.submitted = false;
      });
    } else {
      supplierquotation001wb.insertUser = this.authManager.getcurrentUser.username;
      supplierquotation001wb.insertDatetime = new Date();
      this.supplierQuotationManager.SupplierQuotationSave(supplierquotation001wb).subscribe((response) => {
        this.calloutService.showSuccess("Supplier Quotation Saved Successfully");
        this.PurchaseQuotationForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.PurchaseQuotationForm.reset();
  }
}