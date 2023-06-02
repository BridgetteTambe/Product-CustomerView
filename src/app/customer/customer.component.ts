import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Customer } from "../shared/customer.model";
import { CustomerService } from "../shared/customer.service";
import { Product } from "../shared/product.model";
import { ProductService } from "../shared/product.service";

@Component({
    selector: 'customer-app',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']

})

export class CustomerComponent implements OnInit {

    customers: Customer[] = [];
    customer: any = {};

    products: Product[] = [];

    customerForm!: FormGroup;
    id: any;
    password: any;






    constructor(private customerService: CustomerService, private formBuilder:
        FormBuilder, productService: ProductService) {

    }

    ngOnInit(): void {
        this.buildForm();
 
    }



    buildForm(): void {
        this.customerForm = this.formBuilder.group({
            id: [null, Validators.required],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            idNumber: [null, Validators.required],
            email: [null, Validators.required],
            phoneNumber: [null, Validators.required],
            dateOfBirth: [null, Validators.required],
            password: [null, Validators.required],
        })
    }


    submit(): void {
        let customer = this.customerForm?.value;
        console.log("Customer:", customer);
        if (this.id == null) {
            this.customerService.createCustomer(customer).subscribe(customer => {
                console.log("Customer:", customer);
                this.resetCustomerForm()
                this.closeCustomerFrom();

            })
        } else {
            customer.id = this.id;
            this.customerService.updateCustomer(customer).subscribe(customer => {
                this.customerForm.reset();
                this.closeCustomerFrom();
                console.log("Customer:", customer);
            })

        }

    }

    loginCustomer(email: string, password: string): void {
        this.customerService.loginCustomer(email, password).subscribe(customerLogin => {
            console.log("Customer login:", customerLogin)
        })
    }

    deleteCustomerById(id: any): void {
        this.customerService.deleteCustomerById(id).subscribe(customer => {
            // this.customers=customer;
            console.log("Customer:", customer);

        })
    }

    deleteAllCustomer(): void {
        this.customerService.deleteAllCustomers().subscribe(customer => {
            // this.customers = customer;
            console.log("Delete Customer:", customer)
        })
    }

    // getCustomerById(id: any): void {
    //     this.customerService.getCustomerbyId(id).subscribe(() => {

    //         console.log("Get customer by id:", id);
    //     })
    // }

    openCustomerForm(): void {
        const dialog: any = document.getElementById("customerDialog");
        dialog.showModal();
    }

    closeCustomerFrom(): void {
        const dialog: any = document.getElementById("customerDialog");
        dialog.close();

    }

    editCustomerForm(customer: Customer): void {
        this.id = customer.id;
        this.customerForm.patchValue(customer);
        console.log("customerForm:", this.customerForm.value);
        this.openCustomerForm();
    }

    resetCustomerForm(): void {
        this.customerForm.reset();
    }



}