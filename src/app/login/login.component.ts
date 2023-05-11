import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerService } from "../shared/customer.service";
import { Login } from "../shared/login.model";


@Component({
    selector: 'login-app',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {


    login: Login[] = [];
    loginForm!: FormGroup;
    message!: string;


    constructor(private customerService: CustomerService, private formBuilder: FormBuilder) {
        this.buildForm();
    }


    ngOnInit(): void {

    }

    buildForm() {

        this.loginForm = this.formBuilder.group({
            email: [null, Validators.required],
            password: [null, Validators.required],
        })
    }


    validateForm(): void {
        if (!this.loginForm.valid) {
            this.loginForm.controls['email'].markAsTouched();
            this.loginForm.controls['password'].markAsTouched();
        } else {
            this.submit();
        }
    }

    submit(): void {
        console.log(this.loginForm);
        let login: Login = this.loginForm.value
        console.log('login', login)

        this.customerService.loginCustomer(login.email, login.password).subscribe(loginCustomer => {

           
            if (loginCustomer && !loginCustomer?.message) {
                console.log('customer details ', loginCustomer);
            } else {
                console.log('error message', loginCustomer.message);
                this.message = loginCustomer.message;
            }
        }, error => {
            console.log('Error: ', error)
        });
    }

}

