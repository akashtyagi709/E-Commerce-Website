import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyCartService } from 'src/app/Services/my-cart.service';
import { ProductDetailDataService } from 'src/app/Services/product-detail-data.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {

  selectedProductDetails: any = [];
  isProductAdded: boolean = false;
  prodQuantity: any;

  constructor(private productDataShare: ProductDetailDataService,
    private router: Router,
    public cartData: MyCartService
  ) {
    let data: any = productDataShare.getProduct();
    this.selectedProductDetails = JSON.parse(data);
    console.log(this.selectedProductDetails);

    this.prodQuantity = this.selectedProductDetails.quantity;

    let abc = cartData.getstoreUserCartData();
    if (abc) {
      this.cartData.User_Cart_Data = JSON.parse(abc);
    }

  }
  ngOnInit(): void {
    this.IsalredayAdded(this.selectedProductDetails);
  }

  addtoCart(data: any) {
    this.isProductAdded = !this.isProductAdded;
    this.checkAvailability(this.cartData.User_Cart_Data, data);
  }

  removeFromCart(data: any) {
    this.isProductAdded = !this.isProductAdded;
    for (let i = 0; i < this.cartData.User_Cart_Data.length; i++) {
      const element = this.cartData.User_Cart_Data[i];
      if (element.id=data.id) {
        this.cartData.User_Cart_Data.splice(0,1);
        this.cartData.storeUserCartData(this.cartData.User_Cart_Data);
        return;
      }      
    }
  }

  order(data: any) {
    this.checkAvailability(this.cartData.User_Cart_Data, data);
    this.router.navigate(['/add-to-cart']);
  }


  checkAvailability(array: any, data: any) {
    this.selectedProductDetails['isAdded']=true;
    this.selectedProductDetails['quantity']=this.prodQuantity;
    
    console.log(data);
    this.productDataShare.storeProduct(this.selectedProductDetails);  

    if (array.length == 0) {      
      data['quantity']=this.prodQuantity;
      data['totalAmount'] = data.price * this.prodQuantity;
      this.cartData.User_Cart_Data.push(data);
      this.cartData.storeUserCartData(this.cartData.User_Cart_Data);
    } else {
      let exists = false;
        for (let i = 0; i < array.length; i++) {
        const element = array[i];
        console.log(element);
        if (element.id == data.id) {
          exists = true;
          break;
        }
      }
        if (!exists) {
          // data['isAdded']=true;
          data['quantity']=this.prodQuantity;
          data['totalAmount'] = data.price * this.prodQuantity;
        this.cartData.User_Cart_Data.push(data);
        this.cartData.storeUserCartData(this.cartData.User_Cart_Data);
      }
    }
  }
  


  IsalredayAdded(data:any){
    for (let i = 0; i < this.cartData.User_Cart_Data.length; i++) {
      const element = this.cartData.User_Cart_Data[i];
      console.log(element);
      
          if (data.id==element.id) {
            this.isProductAdded=true;
          }  
    }
  }


  quanitiyFunction(section: any, data: any) {
    if (section == 'add') {
      this.prodQuantity++;
    }
    else {
      if (data > 1) {
        this.prodQuantity--;
      }
    }
  }

}