import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./product.model";

@Injectable()
export class ProductService{

baseUrl:string ='http://localhost:8081/api/products'


constructor(public http: HttpClient){

}

getProductById(id:any): Observable<any>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
}

getAllProduct():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}`)
}




}