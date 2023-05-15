import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Product } from "../shared/product.model";
import { ProductService } from "../shared/product.service";

import * as _ from 'lodash';
import { CustomerService } from "../shared/customer.service";
import { Customer } from "../shared/customer.model";
import { Cart } from "../shared/cart.model";
@Component({
    selector: 'product-app',
    styleUrls: ['./product.component.css'],
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

    products: Product[] = [];
    productForm!: FormGroup;
    customerId!: string| null;
    rows: number[] = [];

    ngOnInit(): void {
        this.getProduct();

    }



    constructor(private productService: ProductService, private formBuilder: FormBuilder,
        private customerService: CustomerService) {

    }


    getProduct(): void {
        this.productService.getAllProduct().subscribe(products => {
            this.products = _.sortBy(products, 'name');

            if (this.products && this.products.length > 0) {
                this.rows = [];
                let value = -1;
                this.products.forEach(product => {
                    value = value + 1;
                    this.rows.push(value++);
                });

            }
            console.log("Get Product", products);
            console.log("Get rows", this.rows)
        })
    }

    getCustomerById(id: any): void {
        this.customerService.getCustomerbyId(id).subscribe((customer) => {

        });
    }

    addToCart(product: Product) {
        this.customerId = localStorage.getItem("CustomerId")
        if(this.customerId){
        this.customerService.getCustomerbyId(+this.customerId).subscribe((customer) => {
    
           if(customer.cart){
            customer.cart.products.push(product);
           }else{
            let cart = new Cart();
            cart.products = [product];
            customer.cart = cart;
           }
            this.customerService.updateCustomer(customer).subscribe((customer) => {
    
            });
        });
    }

    }
}


