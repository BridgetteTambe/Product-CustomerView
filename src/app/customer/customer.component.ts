import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Customer } from "../shared/customer.model";
import { CustomerService } from "../shared/customer.service";

@Component({
    selector: 'customer-app',
    templateUrl: '/customer.component.html',
    styleUrls: ['./customer.component.css']

})

export class CustomerComponent implements OnInit {

    customers: Customer[] = [];

    customer: Customer = new Customer();
    id: any;


    ngOnInit(): void {

    }


    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phoneNumber: string = '';
    dateOfBirth: string = '';
    position: string = '';
    password: string = '';

    
    constructor(public customerService: CustomerService){
        console.log("Constructor started")
    }

    getAllCustomers(): void{
        this.customerService.getAllCustomers().subscribe(customers=>{
            console.log("Customer: ", customers)
        })
    }

    submit():void{
        console.log(this.firstName);
        console.log(this.lastName);
        console.log(this.email);
        console.log(this.phoneNumber);
        console.log(this.dateOfBirth);
        console.log(this.position);
        console.log(this.password);

        let customer: Customer = new Customer();

       customer.firstName = this.firstName;
       customer.lastName = this.lastName;
       customer.email = this.email;
       customer.phoneNumber= this.phoneNumber;
       customer.dateOfBirth = this.dateOfBirth;
       customer.position = this.password;


       if(this.id==null){
        this.customerService.createCustomer(customer).subscribe(customer=>{
            console.log("Customer:", customer);
        })

       }else{
        customer.id = this.id;
        this.customerService.updateCustomer(customer).subscribe(customer=>{
            console.log("Customer:", customer);   
        })

       }

    }

    deleteCustomerById(id:any):void{
        this.customerService.deleteCustomerById(id).subscribe(customer=>{
            console.log("Customer:", customer);

        })
    }

    deleteAllCustomer():void{
        this.customerService.deleteAllCustomers().subscribe(customer=>{
            console.log("Delete Customer:", customer)
        })
    }

    getCustomerById(id:any):void{
        this.customerService.getCustomerbyId(id).subscribe(()=>{
console.log("Customer deleted:",id);
        })
    }

    openCustomerForm():void{
const dialog:any = document.getElementById("customerDialog");
dialog.showModal();
    }

    closeCustomerFrom():void{
        const dialog: any =document.getElementById("customerDialog");
        dialog.close();

    }

    editCustomerForm(customer:Customer):void{
        this.id =customer.id;
        this.firstName = customer.firstName;
        this.lastName = customer.lastName;
        this.email= customer.email;
        this.dateOfBirth = customer.dateOfBirth;
        this.phoneNumber= customer.phoneNumber
       this.closeCustomerFrom();
    }

    resetCustomerForm():void{
        this.firstName='';
        this.lastName='';
        this.email = '';
        this.phoneNumber ='';
        this.dateOfBirth ='';
       
    }

    

}