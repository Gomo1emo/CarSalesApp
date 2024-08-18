import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  
  car: any;
  carId = 0;

  constructor(private router: Router, private productService: ProductsService, private activatedRoute: ActivatedRoute ) { }  // Fixed service name

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id !== null) {
        const CarId = parseInt(id);
        this.carId = CarId;
        this.productService.getProduct(CarId).subscribe((response) => {
          this.car = response;
        });
      }
    });
  }

}
