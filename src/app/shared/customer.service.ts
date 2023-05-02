import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "./customer.model";


@Injectable()
export class CustomerService {
    baseUrl: string = 'http://localhost:8081/api/customer';

    constructor(public http: HttpClient) {

    }

    createCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.baseUrl, customer)
    }

    updateCustomer(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(this.baseUrl, Customer)
    }

    getCustomerbyId(id: number): Observable<any> {
        return this.http.get<Customer>(`${this.baseUrl}/${id}`)
    }

    getAllCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.baseUrl}`)

    }

    deleteCustomerById(id: number): Observable<any> {
        return this.http.delete<Customer>(`${this.baseUrl}/${id}`)
    }

    deleteAllCustomers(): Observable<Customer[]> {
        return this.http.delete<Customer[]>(`${this.baseUrl}`)
    }

    loginCustomer(email: string, password: string): Observable<Customer> {
        return this.http.get<Customer>(`${this.baseUrl}/login/${email}/${password}`)
    }

}