import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookingsServiceService } from 'src/app/services/bookings/bookings-service.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {

  car: any;
  carId = 0;
  bookingForm!: FormGroup;

  constructor(private router: Router, private productService: ProductsService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private bookingService: BookingsServiceService) { }  // Fixed service name

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

    this.bookingForm = this.formBuilder.group({
      fullNames: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      phone: ['', Validators.required],
      additionalDetails: [''],
      email: ['', Validators.required, Validators.email],
    })
  }

  submit() {

    const formData = this.bookingForm.value;
    this.bookingService.postBooking(formData).subscribe(res => { console.log("Booking successful!!!") })
  }

}
