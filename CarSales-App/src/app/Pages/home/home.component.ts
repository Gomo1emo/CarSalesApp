import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private products: ProductsService) {}

  Cars: any[] = []

  ngOnInit(): void {
    this.products.getProducts().subscribe((response) => {
      this.Cars = response;
      console.log(this.Cars)
    })
    
  }
}
