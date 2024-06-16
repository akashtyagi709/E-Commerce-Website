import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyCartService } from 'src/app/Services/my-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  orderNum:any;


  constructor(public cartData:MyCartService,private router:Router){
    this.orderNum=Math.random().toString().split('.')[1];
    console.log(this.orderNum);
    
    localStorage.clear();
    if (cartData.TotalAmount=='')   {
      this.router.navigate(['']);
    }
  }

}
