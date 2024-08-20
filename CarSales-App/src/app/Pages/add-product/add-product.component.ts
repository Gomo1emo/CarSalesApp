import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {


  make!: String
  model!: String
  description!: String
  image1!: String
  image2!: String
  image3!: String
  image4!: String
  image5!: String
  image6!: String
  color!: String
  transmission!: String
  drive!: String
  year!: number
  vin!: number
  price!: number
  fuel!: String;
  milage!: String;
 body!: String;
  carForm: any;
  fb: any;

 constructor(private productService: ProductsService, private router: Router) { }

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.carForm = this.fb.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    color: ['', Validators.required],
    vin: ['', [Validators.required, Validators.pattern('^[A-HJ-NPR-Z0-9]{17}$')]],
    description: ['', Validators.required],
    milage: ['', Validators.required],
    body: ['', Validators.required],
    transmission: ['', Validators.required],
    fuel: ['', Validators.required],
    drive: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
    image1: ['', Validators.required],
    image2: ['', Validators.required],
    image3: ['', Validators.required],
    image4: ['', Validators.required],
    image5: ['', Validators.required],
    image6: ['', Validators.required],
  });
  
 }

  submitCar(): void {


    const carData = this.carForm.value;

    
    this.productService.postProduct(carData).subscribe(
      response => {
        Swal.fire({
          title: "Good job!",
          text: 'Car posted successfully!',
          icon: "success",
          customClass: {
            confirmButton: 'custom-ok-button'
          }
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);

        // this.dialog.open(ModalComponent, {
        //   data: { message: 'Bounty posted successfully!!!' }
        // }).afterClosed().subscribe(() => {
        //   localStorage.removeItem('bountyDraft');  // Clear draft after submission
        // });
      },
      error => {
        // this.dialog.open(ModalComponent, {
        //   data: { message: 'Please fill in the correct information.' }
        // });
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          customClass: {
            confirmButton: 'custom-ok-button'
          }
        });
      }
    );
  }

}
