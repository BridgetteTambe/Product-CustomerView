import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerService } from "../shared/customer.service";
import { Login } from "../shared/login.model";


@Component({
    selector: 'login-app',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
    

    login: Login[] = [];
    loginForm!: FormGroup;
   

    ngOnInit(): void {
        
    }

constructor(private customerService: CustomerService,private formBuilder: FormBuilder){
    this.buildForm();
}

buildForm(){

    this.loginForm = this.formBuilder.group({

        email:[null,Validators.required],
        password:[null,Validators.required],
    })
}

openForm(): void {
    const dialog: any = document.getElementById("favDialog");
    dialog.showModal();
}
closeForm(): void {
    const dialog: any = document.getElementById("favDialog");
    dialog.close();
}

validateForm():void{

    this.loginForm.controls['email'].markAsTouched();
        this.loginForm.controls['password'].markAsTouched();
}

submit():void{
console.log(this.loginForm);
this.validateForm();

if(this.loginForm.valid){
    let login: Login = this.loginForm.value
    console.log('login',login)

    this.customerService.loginCustomer("email", "password").subscribe(loginCustomer => {
        console.log('saved customer ', loginCustomer);
        this.closeForm(); //THis will close  Form 
    });

}
}

}

