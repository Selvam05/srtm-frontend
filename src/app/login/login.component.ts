import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { deserialize } from 'serializer.ts/Serializer';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { AuthManager } from '../shared/services/restcontroller/bizservice/auth-manager.service';
import { DepartmentsManager } from '../shared/services/restcontroller/bizservice/Departments.service';
import { Departments001mb } from '../shared/services/restcontroller/entities/Departments001mb';
import { User001mb } from '../shared/services/restcontroller/entities/User001mb';
import { CalloutService } from '../shared/services/services/callout.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup | any;
	submitted = false;
	username: string = "";
	password: string = "";
	dpslno: number | any = null;
	user001mb?: User001mb;
	departmentSettings: Departments001mb[] = [];
	toggle1: boolean = false;
	constructor(private authManager: AuthManager, private modalService: NgbModal,
		private router: Router,
		private calloutService: CalloutService,
		private departmentsManager: DepartmentsManager,
		private formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			dpslno: [null, Validators.required],
		});
		this.loadData();
	}
	get f() { return this.loginForm.controls; }

	loadData() {
		this.departmentsManager.loginDeptFindAll().subscribe(response => {
			this.departmentSettings = deserialize<Departments001mb[]>(Departments001mb, response);
		});
	}

	private markFormGroupTouched(formGroup: FormGroup) {
		
		(<any>Object).values(formGroup.controls).forEach((control: any) => {
			control.markAsTouched();
			if (control.controls) {
				this.markFormGroupTouched(control);
			}
		});
	}

	onLogInClick(event: any, loginForm: any) {
		this.markFormGroupTouched(this.loginForm);
		this.submitted = true;
		if (this.loginForm.invalid) {
			return;
		}
		this.authManager.login(this.f.username.value, this.f.password.value, this.f.dpslno.value).subscribe(response => {
			this.user001mb = this.authManager.getcurrentUser;
			if (this.user001mb.status == "R") {
				const modalRef = this.modalService.open(ResetPasswordComponent);
				modalRef.componentInstance.user001mb = this.user001mb;
				modalRef.result.then((data) => {
					if (data == "Yes") {
						this.router.navigate(['/app-dash-board']);
					}
				}, (reason) => {
					if (reason == "Yes") {
						this.router.navigate(['/app-dash-board']);
					}
				})
			} else {
				this.router.navigate(['/app-dash-board']);

			}

		},
			err => {
				this.calloutService.showError("Invalid User", err);
			});
	}

	onRegistrationClick() {
		this.router.navigate(['/app-user-registration']);
	}

	changeType(input_field_password: { type: string; }, num: number) {
		if (input_field_password.type == "password")
			input_field_password.type = "text";
		else
			input_field_password.type = "password";

		if (num == 1)
			this.toggle1 = !this.toggle1;
	}

}
