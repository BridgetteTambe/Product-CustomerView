import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Product } from "../shared/product.model";
import { ProductService } from "../shared/product.service";


@Component({
    selector: 'product-app',
    styleUrls: ['./product.component.css'],
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

    products: Product[] = [];

    productForm!: FormGroup;

    ngOnInit(): void {
        this.getProduct();

    }



    constructor(private productService: ProductService, private formBuilder: FormBuilder) {

    }

    rows: number[] = [];
    getProduct(): void {
        this.productService.getAllProduct().subscribe(products => {
            this.products = products;
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

    getProductById(id: any): void {

        this.productService.getProductById(id).subscribe(() => {

        })
    }

}


