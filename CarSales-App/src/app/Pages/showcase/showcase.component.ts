import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent {

  car: any[] = []

  constructor(private router: Router, private product: ProductsService) { }


  ngOnInit(): void {
    this.getProductById(1); // Replace 1 with the desired product ID
  }

  getProductById(id: number): void {
    this.product.getProduct(id).subscribe((response) => {
      this.car = response;
      console.log(this.car);
    });
  }
}
