import { Component } from '@angular/core';
import { MyCartService } from 'src/app/Services/my-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  orderNum:any;


  constructor(public cartData:MyCartService){
    this.orderNum=Math.random().toString().split('.')[1];
    console.log(this.orderNum);
    
    localStorage.clear();
  }

}
