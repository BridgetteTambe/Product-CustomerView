import { Component, OnInit } from '@angular/core';
import { Customer } from './shared/customer.model';
import { CustomerService } from './shared/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CustomerFrontView';

  customer!: Customer;

  constructor(private customerService: CustomerService) {

  }
  ngOnInit(): void {
    let customerId = localStorage.getItem("CustomerId")
    if(customerId){
    this.getCustomerById(customerId);
    }
  }
  CheckMe() {
    console.log("Yoraaa")
  }

  getCustomerById(id: any): void {
    this.customerService.getCustomerbyId(id).subscribe((customer) => {
        console.log("Get customer by id:", id);
       this.customer = customer;
    });
}

}
