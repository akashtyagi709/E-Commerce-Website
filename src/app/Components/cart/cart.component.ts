import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyCartService } from 'src/app/Services/my-cart.service';
import { ProductDetailDataService } from 'src/app/Services/product-detail-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  // UserCartData:any=[];
  Subtotal:any=0;;
  TotalAmount:any;

  
  constructor(private productDataShare:ProductDetailDataService,
    private router:Router, public cartData:MyCartService
  ){
    let data:any=cartData.getstoreUserCartData();
    this.cartData.User_Cart_Data=JSON.parse(data);
    // console.log(this.cartData.User_Cart_Data);
    // this.cartData.User_Cart_Data=this.cartData.User_Cart_Data;
    this.calculateAmount();
  }


  calculateAmount(){
   var sumArray:any=[];
    for (let index = 0; index < this.cartData.User_Cart_Data.length; index++) {
      const element = this.cartData.User_Cart_Data[index];
      sumArray.push(element.totalAmount);      
    }
    let sum=sumArray.reduce((a1:any, a2:any) => a1 + a2, 0);
    this.Subtotal= sum;    
    this.TotalAmount=sum+20;
    console.log(sumArray);
    
    console.log(this.Subtotal);
    console.log(this.TotalAmount);
    this.cartData.TotalAmount=this.TotalAmount;
  }



removeItem(data:any,i:any){
  for (let i = 0; i < this.cartData.User_Cart_Data.length; i++) {
    const element = this.cartData.User_Cart_Data[i];
    if (data.id==element.id) {
      this.cartData.User_Cart_Data.splice(i,1);
      this.calculateAmount();
      this.cartData.storeUserCartData(this.cartData.User_Cart_Data);
      return;
    }   
  }

}


checkout(){

  console.log(localStorage.getItem('userLoggedIn'));
  this.router.navigate(['/checkout']);
  
}

}
