import { Component, OnInit } from '@angular/core';  // Import OnInit for lifecycle hook
import { ParamMap, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';  // Import the service
import { Observable } from 'rxjs';  // Import Observable
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {  // Implement OnInit

  car: any;  // Use a single product object instead of an array
  carId = 0;

  constructor(private router: Router, private productService: ProductsService, private activatedRoute: ActivatedRoute ) { }  // Fixed service name

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id !== null) {
        const bountyId = parseInt(id);
        this.carId = bountyId;
        this.productService.getProduct(bountyId).subscribe((response) => {
          this.car = response;
        });
      }
    });
  }

  
}
