import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MyCartService } from 'src/app/Services/my-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  no_of_Items:any=0;

  constructor(public cartData:MyCartService, public authservice:AuthService){   
  //  this.no_of_Items= cartData.getNumberOfItems();  
  }


  ngOnInit(): void {
 
  }

}
