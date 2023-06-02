import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Customer } from "../shared/customer.model";
import { CustomerService } from "../shared/customer.service";


@Component({
    selector: 'profile-app',
    styleUrls: ['./profile.component.css'],
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {

    customer!: Customer;
    profileForm!: FormGroup;
    id!: number;


    constructor(private formBuilder: FormBuilder, private customerService: CustomerService) {
      
    }
    ngOnInit(): void {
        this.buildProfileForm();
        let customerId = localStorage.getItem("CustomerId")
        if(customerId){
        this.getCustomerById(customerId);
        }
    }

    getCustomerById(id: any): void {
        this.customerService.getCustomerbyId(id).subscribe((customer) => {
            console.log("Get customer by id:", id);
            this.profileForm.patchValue(customer)
        });
    }


    buildProfileForm() {
        this.profileForm = this.formBuilder.group({
            firstName: [null],
            lastName: [null],
            email: [null],
            id: [null],
            idNumber: [null],
            phoneNumber: [null],
            password: [null]
        })
    }

    submit(): void {
        let customer = this.profileForm?.value;
        console.log("Customer:", customer);
            this.customerService.updateCustomer(customer).subscribe(customer => {
              
                console.log("Customer:", customer);
            })

        }
    
}