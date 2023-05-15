import { Cart } from "./cart.model";

export interface Customer {
    id: any;
    idNumber:string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string;
    message: string;
    cart: Cart,
    orders:[]
}


