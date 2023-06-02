import { Component, OnInit } from "@angular/core";


@Component({
    selector: 'cart-app',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
    
    
    
    ngOnInit(): void {
    }

    openCustomerForm(): void {
        const dialog: any = document.getElementById("customerDialog");
        dialog.showModal();
    }


    
}